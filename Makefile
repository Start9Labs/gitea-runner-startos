# overrides to s9pk.mk must precede the include statement
# The shared guest images support these package architectures.
ARCHES := x86 arm
include node_modules/@start9labs/start-sdk/s9pk.mk

javascript/index.js: $(shell find node_modules/forgejo-runner-startos/runtime -name '*.ts' 2>/dev/null)
