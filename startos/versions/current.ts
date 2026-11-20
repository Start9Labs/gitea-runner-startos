import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.0.1:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 6.0.1. Adds support for \`cache-mode\` in workflows (with Gitea 29.0.0 or later) and for \`ACTIONS_STEP_DEBUG\` as a repository variable. Fixes job container \`ports\` not being published, \`always()\` and \`cancelled()\` steps not running after a job timeout, empty \`github.env\` and \`github.path\`, and Dockerfile actions hiding their build output and ignoring \`.dockerignore\`. Full notes: https://gitea.com/gitea/runner/releases/tag/v6.0.1`,
    es_ES: `Gitea Runner actualizado a 6.0.1. Añade compatibilidad con \`cache-mode\` en los flujos (con Gitea 29.0.0 o posterior) y con \`ACTIONS_STEP_DEBUG\` como variable del repositorio. Corrige los \`ports\` del contenedor del trabajo que no se publicaban, los pasos \`always()\` y \`cancelled()\` que no se ejecutaban tras agotarse el tiempo del trabajo, \`github.env\` y \`github.path\` vacíos, y las acciones Dockerfile que ocultaban su salida de compilación e ignoraban \`.dockerignore\`. Notas completas: https://gitea.com/gitea/runner/releases/tag/v6.0.1`,
    de_DE: `Gitea Runner auf 6.0.1 aktualisiert. Unterstützt \`cache-mode\` in Workflows (ab Gitea 29.0.0) und \`ACTIONS_STEP_DEBUG\` als Repository-Variable. Behebt nicht veröffentlichte \`ports\` des Job-Containers, nach einer Job-Zeitüberschreitung nicht ausgeführte \`always()\`- und \`cancelled()\`-Schritte, leere \`github.env\` und \`github.path\` sowie Dockerfile-Actions, die ihre Build-Ausgabe verbargen und \`.dockerignore\` ignorierten. Vollständige Hinweise: https://gitea.com/gitea/runner/releases/tag/v6.0.1`,
    pl_PL: `Zaktualizowano Gitea Runner do 6.0.1. Dodaje obsługę \`cache-mode\` w przepływach (z Gitea 29.0.0 lub nowszym) oraz \`ACTIONS_STEP_DEBUG\` jako zmiennej repozytorium. Naprawia niepublikowane \`ports\` kontenera zadania, kroki \`always()\` i \`cancelled()\` niewykonywane po przekroczeniu limitu czasu zadania, puste \`github.env\` i \`github.path\` oraz akcje Dockerfile ukrywające wynik budowania i ignorujące \`.dockerignore\`. Pełne informacje: https://gitea.com/gitea/runner/releases/tag/v6.0.1`,
    fr_FR: `Gitea Runner mis à jour vers la version 6.0.1. Prend en charge \`cache-mode\` dans les workflows (avec Gitea 29.0.0 ou ultérieur) et \`ACTIONS_STEP_DEBUG\` comme variable de dépôt. Corrige les \`ports\` du conteneur de tâche non publiés, les étapes \`always()\` et \`cancelled()\` non exécutées après l'expiration d'une tâche, \`github.env\` et \`github.path\` vides, ainsi que les actions Dockerfile qui masquaient leur sortie de build et ignoraient \`.dockerignore\`. Notes complètes : https://gitea.com/gitea/runner/releases/tag/v6.0.1`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
