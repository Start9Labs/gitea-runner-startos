import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.2.3:0',
  releaseNotes: {
    en_US:
      'Updated Gitea Runner to 5.2.3 and start-sdk to 3.1.1. Fixes action log grouping and damaged action caches, leaves shared action sources unmodified, and keeps dry runs off Docker. Full upstream notes: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    es_ES:
      'Gitea Runner actualizado a 5.2.3 y start-sdk a 3.1.1. Corrige la agrupación de registros de acciones y las cachés de acciones dañadas, mantiene intactas las fuentes compartidas de acciones y evita acceder a Docker en las ejecuciones de prueba. Notas completas: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    de_DE:
      'Gitea Runner auf 5.2.3 und start-sdk auf 3.1.1 aktualisiert. Behebt die Gruppierung von Action-Protokollen und beschädigte Action-Caches, lässt gemeinsam genutzte Action-Quellen unverändert und vermeidet Docker-Zugriffe bei Probeläufen. Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    pl_PL:
      'Zaktualizowano Gitea Runner do 5.2.3 i start-sdk do 3.1.1. Naprawia grupowanie dzienników akcji i uszkodzone pamięci podręczne akcji, pozostawia współdzielone źródła akcji bez zmian i nie łączy się z Dockerem podczas próbnych uruchomień. Pełne informacje: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    fr_FR:
      'Gitea Runner mis à jour vers la version 5.2.3 et start-sdk vers 3.1.1. Corrige le regroupement des journaux et les caches d’actions endommagés, conserve les sources d’actions partagées intactes et évite les accès à Docker lors des simulations. Notes complètes : https://gitea.com/gitea/runner/releases/tag/v5.2.3',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
