import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.2.3:0',
  releaseNotes: {
    en_US:
      'Updated Gitea Runner to 5.2.3: action log groups close before the action runs, and damaged cached actions are fetched again. Full upstream notes: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    es_ES:
      'Gitea Runner actualizado a 5.2.3: los grupos de registro de las acciones se cierran antes de que la acción se ejecute, y las acciones en caché dañadas se vuelven a descargar. Notas completas: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    de_DE:
      'Gitea Runner auf 5.2.3 aktualisiert: Protokollgruppen von Actions werden vor dem Ausführen der Action geschlossen, und beschädigte zwischengespeicherte Actions werden erneut abgerufen. Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    pl_PL:
      'Zaktualizowano Gitea Runner do 5.2.3: grupy dziennika akcji są zamykane przed uruchomieniem akcji, a uszkodzone akcje z pamięci podręcznej są pobierane ponownie. Pełne informacje: https://gitea.com/gitea/runner/releases/tag/v5.2.3',
    fr_FR:
      "Gitea Runner mis à jour vers la version 5.2.3 : les groupes de journaux des actions se ferment avant l'exécution de l'action, et les actions en cache endommagées sont à nouveau téléchargées. Notes complètes : https://gitea.com/gitea/runner/releases/tag/v5.2.3",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
