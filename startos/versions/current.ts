import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.4.1:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.4.1.

- Prevents a job's Docker socket path from being created as a directory.
- Includes upstream dependency maintenance.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.4.1`,
    es_ES: `Gitea Runner actualizado a 3.4.1.

- Evita que la ruta del socket de Docker de un trabajo se cree como directorio.
- Incluye mantenimiento de dependencias upstream.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.4.1`,
    de_DE: `Gitea Runner auf 3.4.1 aktualisiert.

- Verhindert, dass der Docker-Socket-Pfad eines Jobs als Verzeichnis erstellt wird.
- Enthält Wartungsupdates für Upstream-Abhängigkeiten.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.4.1`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.4.1.

- Zapobiega utworzeniu ścieżki gniazda Dockera zadania jako katalogu.
- Zawiera aktualizacje zależności upstream.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.4.1`,
    fr_FR: `Gitea Runner mis à jour vers 3.4.1.

- Empêche la création du chemin du socket Docker d'un job sous forme de répertoire.
- Inclut la maintenance des dépendances en amont.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.4.1`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
