# TODO

- Emulation toggle: gitea's act_runner (1.0.8) has no `?platform=` label option (unlike forgejo-runner), so a foreign-arch label can't pin the platform — emulating a whole foreign-arch job would require a single-arch foreign image rather than the multi-arch catthehacker default. Revisit if upstream adds platform pinning. (The forgejo-runner sibling implements this toggle.)
- Sibling package: `forgejo-runner-startos` (Forgejo). Now diverges: Forgejo is on the v12 connection model (UUID + token) and has the emulation toggle; Gitea keeps the `register` flow.
