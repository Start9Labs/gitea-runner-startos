import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.0.1:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 2.0.1.

- Skips service containers declared with an empty image instead of failing the job.
- Prevents exponential growth of RunContext masks in composite actions.
- Attaches the task token when cloning actions from a self-hosted instance on a different host.

Full release notes: https://gitea.com/gitea/runner/releases/tag/v2.0.1`,
    es_ES: `Actualiza Gitea Runner a 2.0.1.

- Omite los contenedores de servicio declarados con una imagen vacía en lugar de hacer fallar el trabajo.
- Evita el crecimiento exponencial de las máscaras de RunContext en las acciones compuestas.
- Adjunta el token de la tarea al clonar acciones desde una instancia autoalojada en otro host.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v2.0.1`,
    de_DE: `Aktualisiert Gitea Runner auf 2.0.1.

- Überspringt Service-Container, die mit einem leeren Image deklariert sind, anstatt den Job fehlschlagen zu lassen.
- Verhindert das exponentielle Wachstum von RunContext-Masken in zusammengesetzten Aktionen.
- Hängt das Task-Token an, wenn Aktionen von einer selbst gehosteten Instanz auf einem anderen Host geklont werden.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v2.0.1`,
    pl_PL: `Aktualizuje Gitea Runner do 2.0.1.

- Pomija kontenery usług zadeklarowane z pustym obrazem, zamiast przerywać zadanie błędem.
- Zapobiega wykładniczemu wzrostowi masek RunContext w akcjach złożonych.
- Dołącza token zadania podczas klonowania akcji z instancji samodzielnie hostowanej na innym hoście.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v2.0.1`,
    fr_FR: `Met à jour Gitea Runner vers 2.0.1.

- Ignore les conteneurs de service déclarés avec une image vide au lieu de faire échouer le job.
- Empêche la croissance exponentielle des masques RunContext dans les actions composites.
- Joint le jeton de tâche lors du clonage d'actions depuis une instance auto-hébergée sur un autre hôte.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v2.0.1`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
