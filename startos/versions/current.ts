import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.2.4:0',
  releaseNotes: {
    en_US:
      'Updated Gitea Runner to 5.2.4. Fixes the v4 artifact API used by upload-artifact v4 and later. Full upstream notes: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    es_ES:
      'Gitea Runner actualizado a 5.2.4. Corrige la API de artefactos v4 utilizada por upload-artifact v4 y posteriores. Notas completas: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    de_DE:
      'Gitea Runner auf 5.2.4 aktualisiert. Behebt die von upload-artifact v4 und neuer verwendete Artefakt-API v4. Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    pl_PL:
      'Zaktualizowano Gitea Runner do 5.2.4. Naprawiono API artefaktów v4 używane przez upload-artifact v4 i nowsze. Pełne informacje: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    fr_FR:
      'Gitea Runner mis à jour vers la version 5.2.4. Corrige l’API d’artefacts v4 utilisée par upload-artifact v4 et les versions ultérieures. Notes complètes : https://gitea.com/gitea/runner/releases/tag/v5.2.4',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
