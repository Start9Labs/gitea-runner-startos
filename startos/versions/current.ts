import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.2.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 2.2.0.

- Adds runner health admission checks.
- Reports a GitHub-style "Set up job" section in job logs.
- Classifies a cancelled step as an interruption rather than a failure.
- Fixes a race with the container daemon when removing job containers.
- Updates bundled dependencies (docker/cli 29.6.2, go-isatty, setup-node).

Full release notes: https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    es_ES: `Actualiza Gitea Runner a 2.2.0.

- Añade comprobaciones de admisión del estado del runner.
- Muestra una sección «Set up job» al estilo de GitHub en los registros de los trabajos.
- Clasifica un paso cancelado como una interrupción en lugar de un fallo.
- Corrige una condición de carrera con el demonio de contenedores al eliminar los contenedores de los trabajos.
- Actualiza las dependencias incluidas (docker/cli 29.6.2, go-isatty, setup-node).

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    de_DE: `Aktualisiert Gitea Runner auf 2.2.0.

- Fügt Zulassungsprüfungen für den Runner-Zustand hinzu.
- Zeigt in den Job-Protokollen einen GitHub-ähnlichen Abschnitt „Set up job“ an.
- Stuft einen abgebrochenen Schritt als Unterbrechung statt als Fehler ein.
- Behebt eine Race-Condition mit dem Container-Daemon beim Entfernen von Job-Containern.
- Aktualisiert die enthaltenen Abhängigkeiten (docker/cli 29.6.2, go-isatty, setup-node).

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    pl_PL: `Aktualizuje Gitea Runner do 2.2.0.

- Dodaje kontrole dopuszczenia stanu runnera.
- Wyświetla w dziennikach zadań sekcję „Set up job” w stylu GitHuba.
- Klasyfikuje anulowany krok jako przerwanie, a nie niepowodzenie.
- Naprawia sytuację wyścigu z demonem kontenerów podczas usuwania kontenerów zadań.
- Aktualizuje dołączone zależności (docker/cli 29.6.2, go-isatty, setup-node).

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    fr_FR: `Met à jour Gitea Runner vers 2.2.0.

- Ajoute des contrôles d'admission de l'état du runner.
- Affiche une section « Set up job » de style GitHub dans les journaux des tâches.
- Classe une étape annulée comme une interruption plutôt qu'un échec.
- Corrige une situation de concurrence avec le démon de conteneurs lors de la suppression des conteneurs de tâches.
- Met à jour les dépendances incluses (docker/cli 29.6.2, go-isatty, setup-node).

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
