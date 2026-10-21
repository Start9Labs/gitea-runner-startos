# Gitea Runner package development

- Start at `../start-technologies/projects/start-sdk/docs/src/recipes.md`; read upstream's `AGENTS.md` and `DEVELOPMENT.md` before changing carried Go patches.
- Keep `node_modules/forgejo-runner-startos/runtime/**/*.ts` in `tsconfig.json` and the runtime sources in Make's JavaScript dependencies. A green standalone `tsc` does not establish NCC emitted dependency TypeScript.
- Pin the shared dependency by immutable commit and update its lockfile. Generic runtime fixes belong in that owner; registration and native CLI changes belong here.
- Apply source patches only in a build/test copy. Stage the clean upstream gitlink, not throwaway commits or patched submodule content.
