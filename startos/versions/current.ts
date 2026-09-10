import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.4.2:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.4.2.

- Fixes artifact uploads when the cache server cannot connect to Gitea.
- Improves IPv6 URL handling, cache-server shutdown, and concurrent task admission.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.4.2`,
    es_ES: `Gitea Runner actualizado a 3.4.2.

- Corrige la carga de artefactos cuando el servidor de caché no puede conectarse a Gitea.
- Mejora la gestión de URL IPv6, el cierre del servidor de caché y la admisión simultánea de tareas.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.4.2`,
    de_DE: `Gitea Runner auf 3.4.2 aktualisiert.

- Behebt Artefakt-Uploads, wenn der Cache-Server Gitea nicht erreichen kann.
- Verbessert die Verarbeitung von IPv6-URLs, das Herunterfahren des Cache-Servers und die gleichzeitige Aufgabenzulassung.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.4.2`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.4.2.

- Naprawiono przesyłanie artefaktów, gdy serwer pamięci podręcznej nie może połączyć się z Gitea.
- Ulepszono obsługę adresów URL IPv6, zamykanie serwera pamięci podręcznej i równoczesne przyjmowanie zadań.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.4.2`,
    fr_FR: `Gitea Runner mis à jour vers 3.4.2.

- Corrige le téléversement des artefacts lorsque le serveur de cache ne peut pas joindre Gitea.
- Améliore la gestion des URL IPv6, l'arrêt du serveur de cache et l'admission simultanée des tâches.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.4.2`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
