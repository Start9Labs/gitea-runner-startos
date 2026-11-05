import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.4.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.4.0. Retries failed image pulls and Dockerfile action builds, fixes concurrent jobs building the same Dockerfile action, and fixes built-in Git LFS checkout with older Git LFS versions. Requires StartOS 0.4.1 or later.

[Full release notes](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    es_ES: `Gitea Runner actualizado a 5.4.0. Reintenta las descargas de imágenes y las compilaciones de acciones Dockerfile fallidas, corrige los trabajos simultáneos que compilan la misma acción Dockerfile y corrige la extracción integrada de Git LFS con versiones antiguas de Git LFS. Requiere StartOS 0.4.1 o posterior.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    de_DE: `Gitea Runner auf 5.4.0 aktualisiert. Wiederholt fehlgeschlagene Image-Downloads und Dockerfile-Action-Builds, behebt gleichzeitige Jobs beim Erstellen derselben Dockerfile-Action und korrigiert den integrierten Git-LFS-Checkout mit älteren Git-LFS-Versionen. Erfordert StartOS 0.4.1 oder neuer.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.4.0. Ponawia nieudane pobieranie obrazów i budowanie akcji Dockerfile, naprawia równoległe zadania budujące tę samą akcję Dockerfile oraz wbudowane pobieranie Git LFS ze starszymi wersjami Git LFS. Wymaga StartOS 0.4.1 lub nowszego.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.4.0. Réessaie les téléchargements d’images et les compilations d’actions Dockerfile en échec, corrige les tâches simultanées compilant la même action Dockerfile et corrige l’extraction Git LFS intégrée avec les anciennes versions de Git LFS. Nécessite StartOS 0.4.1 ou ultérieur.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
