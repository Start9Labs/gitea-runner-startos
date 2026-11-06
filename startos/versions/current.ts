import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.4.1:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.4.1. Fixes gaps in secret masking in workflow command logs and disables automatic cleanup of job-created containers, networks and volumes by default. Retries failed image pulls and Dockerfile action builds, fixes concurrent jobs building the same Dockerfile action, and fixes built-in Git LFS checkout with older Git LFS versions. Requires StartOS 0.4.1 or later.

[5.4.1 release notes](https://gitea.com/gitea/runner/releases/tag/v5.4.1) · [5.4.0 release notes](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    es_ES: `Gitea Runner actualizado a 5.4.1. Corrige fallos en el enmascaramiento de secretos en los registros de comandos de los flujos y desactiva por defecto la limpieza automática de contenedores, redes y volúmenes creados por los trabajos. Reintenta las descargas de imágenes y las compilaciones de acciones Dockerfile fallidas, corrige los trabajos simultáneos que compilan la misma acción Dockerfile y corrige la extracción integrada de Git LFS con versiones antiguas de Git LFS. Requiere StartOS 0.4.1 o posterior.

[Notas de la versión 5.4.1](https://gitea.com/gitea/runner/releases/tag/v5.4.1) · [Notas de la versión 5.4.0](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    de_DE: `Gitea Runner auf 5.4.1 aktualisiert. Behebt Lücken bei der Maskierung von Secrets in Workflow-Befehlsprotokollen und deaktiviert standardmäßig die automatische Bereinigung der von Jobs erstellten Container, Netzwerke und Volumes. Wiederholt fehlgeschlagene Image-Downloads und Dockerfile-Action-Builds, behebt gleichzeitige Jobs beim Erstellen derselben Dockerfile-Action und korrigiert den integrierten Git-LFS-Checkout mit älteren Git-LFS-Versionen. Erfordert StartOS 0.4.1 oder neuer.

[Versionshinweise zu 5.4.1](https://gitea.com/gitea/runner/releases/tag/v5.4.1) · [Versionshinweise zu 5.4.0](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.4.1. Naprawia luki w maskowaniu sekretów w dziennikach poleceń przepływów i domyślnie wyłącza automatyczne usuwanie kontenerów, sieci i woluminów utworzonych przez zadania. Ponawia nieudane pobieranie obrazów i budowanie akcji Dockerfile, naprawia równoległe zadania budujące tę samą akcję Dockerfile oraz wbudowane pobieranie Git LFS ze starszymi wersjami Git LFS. Wymaga StartOS 0.4.1 lub nowszego.

[Informacje o wydaniu 5.4.1](https://gitea.com/gitea/runner/releases/tag/v5.4.1) · [Informacje o wydaniu 5.4.0](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.4.1. Corrige des lacunes dans le masquage des secrets dans les journaux de commandes des workflows et désactive par défaut le nettoyage automatique des conteneurs, réseaux et volumes créés par les tâches. Réessaie les téléchargements d’images et les compilations d’actions Dockerfile en échec, corrige les tâches simultanées compilant la même action Dockerfile et corrige l’extraction Git LFS intégrée avec les anciennes versions de Git LFS. Nécessite StartOS 0.4.1 ou ultérieur.

[Notes de version 5.4.1](https://gitea.com/gitea/runner/releases/tag/v5.4.1) · [Notes de version 5.4.0](https://gitea.com/gitea/runner/releases/tag/v5.4.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
