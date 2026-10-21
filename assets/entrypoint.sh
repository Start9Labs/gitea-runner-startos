#!/bin/bash
set -euo pipefail
umask 077

: "${INSTANCE_URL:?}"
: "${RUNNER_LABELS:?}"
: "${RUNNER_REGISTRATION_DIR:?}"
: "${RUNNER_REGISTRATION_REVISION:=0}"
: "${RUNNER_REGISTRATION_PENDING:=false}"
: "${RUNNER_NAME:=startos-runner}"
: "${RUNNER_CAPACITY:=1}"

IFS=',' read -ra label_list <<< "$RUNNER_LABELS"
ORIGINAL="$RUNNER_REGISTRATION_DIR/.runner"
RECEIPT=${RUNNER_REGISTRATION_RECEIPT:-}

valid_registration() {
  [ -f "$1" ] && [ ! -L "$1" ] && jq -e '
    (.uuid | type == "string" and length > 0) and
    (.token | type == "string" and length > 0) and
    ((.ephemeral // false) == false)
  ' "$1" >/dev/null 2>&1
}

identity_config() {
  local config=$1 registration=$2
  gitea-runner --config "$config" config init --force
  gitea-runner --config "$config" config set runner.file "$registration"
  gitea-runner --config "$config" config set runner.labels "${label_list[@]}"
  gitea-runner --config "$config" config set runner.env_file ''
}

publish_registration() {
  local staged=$1
  cp --remove-destination "$staged" "$ORIGINAL.tmp"
  mv -f "$ORIGINAL.tmp" "$ORIGINAL"
  printf '%s\n' "$RUNNER_REGISTRATION_REVISION" > "$RECEIPT.tmp"
  mv -f "$RECEIPT.tmp" "$RECEIPT"
  rm -f "$staged" "$staged.lock"
}

register_identity() {
  : "${RUNNER_REGISTRATION_RECEIPT:?}"
  [[ "$RUNNER_REGISTRATION_REVISION" =~ ^(0|[1-9][0-9]*)$ ]]
  case "$RUNNER_REGISTRATION_PENDING" in true|false) ;; *) exit 1;; esac
  mkdir -p "$RUNNER_REGISTRATION_DIR"
  chmod 700 "$RUNNER_REGISTRATION_DIR"
  exec 9> "$ORIGINAL.lock"
  flock -x 9
  local staged="$RUNNER_REGISTRATION_DIR/.runner.pending-$RUNNER_REGISTRATION_REVISION"
  local config="$RUNNER_REGISTRATION_DIR/registration-config.yaml"
  local receipt
  receipt=$(cat "$RECEIPT" 2>/dev/null || true)
  if [ "$RUNNER_REGISTRATION_PENDING" = true ] && [ "$receipt" != "$RUNNER_REGISTRATION_REVISION" ]; then
    if ! valid_registration "$staged"; then
      : "${RUNNER_TOKEN:?A fresh Gitea registration token is required}"
      rm -f "$staged"
      identity_config "$config" "$staged"
      gitea-runner --config "$config" register --no-interactive \
        --instance "$INSTANCE_URL" --token "$RUNNER_TOKEN" --name "$RUNNER_NAME"
      valid_registration "$staged"
    fi
    publish_registration "$staged"
  elif ! valid_registration "$ORIGINAL" && [ "$receipt" = "$RUNNER_REGISTRATION_REVISION" ] && valid_registration "$staged"; then
    publish_registration "$staged"
  fi
  if ! valid_registration "$ORIGINAL"; then
    echo 'gitea-runner: a persistent registration is required; use Configure with a fresh token.' >&2
    return 1
  fi
  rm -f "$config" "$staged" "$staged.lock"
}

wait_for_registration() {
  echo 'gitea-runner: Gitea no longer recognizes this identity; use Configure with a fresh registration token.' >&2
  exec sleep infinity
}

run_controller() {
  : "${DOCKER_HOST:?}"
  : "${RUNNER_SCRATCH_DIR:?}"
  : "${RUNNER_DEFAULT_IMAGE:?}"
  local data=/data/runner config=/data/runner/config.yaml snapshot=/data/runner/.runner
  test "$ORIGINAL" != "$snapshot"
  mkdir -p "$data/run"
  exec 9< "$ORIGINAL.lock"
  flock -s 9
  valid_registration "$ORIGINAL"
  jq --arg address "$INSTANCE_URL" '.address = $address' "$ORIGINAL" > "$snapshot.tmp"
  mv -f "$snapshot.tmp" "$snapshot"
  local uuid rejected="$data/rejected-uuid"
  uuid=$(jq -er .uuid "$snapshot")
  if [ "$(cat "$rejected" 2>/dev/null || true)" = "$uuid" ]; then
    wait_for_registration
  fi
  rm -f "$rejected"
  identity_config "$config" "$snapshot"
  gitea-runner --config "$config" config set runner.capacity "$RUNNER_CAPACITY"
  gitea-runner --config "$config" config set runner.default_image "$RUNNER_DEFAULT_IMAGE"
  gitea-runner --config "$config" config set runner.client_cert_file ''
  gitea-runner --config "$config" config set runner.client_key_file ''
  gitea-runner --config "$config" config set host.workdir_parent /tmp/runner-actions
  gitea-runner --config "$config" config set cache.enabled false
  gitea-runner --config "$config" config set container.require_docker true
  gitea-runner --config "$config" config set container.privileged true
  gitea-runner --config "$config" config set container.docker_host "$DOCKER_HOST"
  if [ -n "${RUNNER_BEFORE_JOB:-}" ]; then
    gitea-runner --config "$config" config set runner.before_job "$RUNNER_BEFORE_JOB"
  fi
  local hosts options
  hosts=$(jq -er 'if type != "array" or any(.[]; type != "string" or (test("^[A-Za-z0-9][A-Za-z0-9.-]*:[0-9.]+$") | not)) then error("Invalid local host mapping") else map(" --add-host " + .) | join("") end' <<< "${RUNNER_LOCAL_HOSTS:-[]}")
  options="--volume $RUNNER_SCRATCH_DIR:/root/setup-docker-action --volume /etc/resolv.conf:/etc/resolv.conf:ro$hosts"
  local -a volumes=("$RUNNER_SCRATCH_DIR" /etc/resolv.conf)
  if [[ "$DOCKER_HOST" = tcp://* ]]; then
    options+=' --volume /var/run/docker.sock:/var/run/docker.sock'
    volumes+=(/var/run/docker.sock)
  fi
  gitea-runner --config "$config" config set container.options "$options"
  gitea-runner --config "$config" config set container.valid_volumes "${volumes[@]}"
  source /usr/local/libexec/runner-docker-client.sh
  cd "$data"
  local log="$data/run/daemon.log" pid tee_pid status=0
  exec 3> >(tee "$log")
  tee_pid=$!
  gitea-runner --config "$config" "$@" >&3 2>&1 &
  pid=$!
  exec 3>&-
  trap 'kill -TERM "$pid" 2>/dev/null || true' TERM INT
  wait "$pid" || status=$?
  while kill -0 "$pid" 2>/dev/null; do status=0; wait "$pid" || status=$?; done
  wait "$tee_pid" || true
  if grep -qE '^Error: ([a-z_]+: )?(unregistered runner|runner is no longer registered with the server; please register it again)$' "$log"; then
    printf '%s\n' "$uuid" > "$rejected"
    wait_for_registration
  fi
  return "$status"
}

case "${1:-daemon}" in
  register)
    [ "$#" -eq 1 ]
    register_identity
    ;;
  one-job)
    [ "$#" -eq 2 ] && [ "$2" = --wait ]
    run_controller daemon --once
    ;;
  daemon)
    [ "$#" -le 1 ]
    run_controller daemon
    ;;
  *) echo 'Unsupported runner adapter mode' >&2; exit 1;;
esac
