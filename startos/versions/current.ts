import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.2.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.2.0 and start-sdk to 3.1.0. Includes the unpublished 5.1.1 update.

- Go 1.27.3 fixes CVE-2026-111943 by distrusting affected intermediate certificates.
- Successful host steps no longer fail when a background process keeps their output open.
- Fixes YAML block and folded scalar round-trips; config edits no longer wrap lines.
- Docker build contexts skip unreadable files with a warning and no longer preserve security.capability attributes. Cache and artifact servers support HEAD, but no longer redirect trailing slashes or answer OPTIONS.
- Downloads each action once per job as an archive, with retries and a git fallback; fixes "cannot lock ref" errors and stale commits after a branch or tag moves.
- Removes job networks even when container removal is slow, and reclaims orphaned job networks and volumes after 10 minutes.

[5.2.0 release notes](https://gitea.com/gitea/runner/releases/tag/v5.2.0) · [5.1.1 release notes](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    es_ES: `Gitea Runner actualizado a 5.2.0 y start-sdk a 3.1.0. Incluye la actualización 5.1.1 aún no publicada en el registro.

- Go 1.27.3 corrige CVE-2026-111943 al dejar de confiar en los certificados intermedios afectados.
- Los pasos del anfitrión que terminan correctamente ya no fallan cuando un proceso en segundo plano mantiene abierta su salida.
- Corrige la lectura y escritura de escalares de bloque y plegados de YAML; las ediciones de configuración ya no dividen las líneas.
- Los contextos de compilación de Docker omiten archivos ilegibles con una advertencia y ya no conservan atributos security.capability. Los servidores de caché y artefactos admiten HEAD, pero ya no redirigen barras finales ni responden a OPTIONS.
- Descarga cada acción una vez por trabajo como archivo comprimido, con reintentos y git como alternativa; corrige errores "cannot lock ref" y commits obsoletos tras mover una rama o etiqueta.
- Elimina las redes de los trabajos aunque la eliminación de contenedores sea lenta y recupera las redes y los volúmenes huérfanos tras 10 minutos.

[Notas de la versión 5.2.0](https://gitea.com/gitea/runner/releases/tag/v5.2.0) · [Notas de la versión 5.1.1](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    de_DE: `Gitea Runner auf 5.2.0 und start-sdk auf 3.1.0 aktualisiert. Enthält das noch nicht in der Registry veröffentlichte Update 5.1.1.

- Go 1.27.3 behebt CVE-2026-111943, indem betroffenen Zwischenzertifikaten nicht mehr vertraut wird.
- Erfolgreiche Host-Schritte schlagen nicht mehr fehl, wenn ein Hintergrundprozess ihre Ausgabe offen hält.
- Behebt das Einlesen und Schreiben von YAML-Blockskalaren und gefalteten Skalaren; Konfigurationsänderungen brechen Zeilen nicht mehr um.
- Docker-Build-Kontexte überspringen unlesbare Dateien mit einer Warnung und behalten security.capability-Attribute nicht mehr bei. Cache- und Artefaktserver unterstützen HEAD, leiten abschließende Schrägstriche aber nicht mehr um und beantworten OPTIONS nicht mehr.
- Lädt jede Action einmal pro Job als Archiv herunter, mit Wiederholungsversuchen und git als Ausweichmethode; behebt "cannot lock ref"-Fehler und veraltete Commits nach dem Verschieben eines Branches oder Tags.
- Entfernt Job-Netzwerke auch bei langsamer Container-Entfernung und bereinigt verwaiste Job-Netzwerke und Volumes nach 10 Minuten.

[Versionshinweise zu 5.2.0](https://gitea.com/gitea/runner/releases/tag/v5.2.0) · [Versionshinweise zu 5.1.1](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.2.0 i start-sdk do 3.1.0. Zawiera aktualizację 5.1.1 jeszcze nieopublikowaną w rejestrze.

- Go 1.27.3 naprawia CVE-2026-111943 przez wycofanie zaufania do objętych problemem certyfikatów pośrednich.
- Poprawnie zakończone kroki hosta nie zgłaszają już błędu, gdy proces w tle utrzymuje otwarte wyjście.
- Naprawia odczyt i zapis blokowych i składanych skalarów YAML; edycja konfiguracji nie zawija już wierszy.
- Konteksty budowania Dockera pomijają nieczytelne pliki z ostrzeżeniem i nie zachowują już atrybutów security.capability. Serwery pamięci podręcznej i artefaktów obsługują HEAD, ale nie przekierowują już końcowych ukośników ani nie odpowiadają na OPTIONS.
- Pobiera każdą akcję raz na zadanie jako archiwum, z ponawianiem prób i git jako metodą zapasową; naprawia błędy "cannot lock ref" i nieaktualne commity po przesunięciu gałęzi lub tagu.
- Usuwa sieci zadań nawet przy powolnym usuwaniu kontenerów i odzyskuje osierocone sieci i woluminy zadań po 10 minutach.

[Informacje o wydaniu 5.2.0](https://gitea.com/gitea/runner/releases/tag/v5.2.0) · [Informacje o wydaniu 5.1.1](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.2.0 et start-sdk vers 3.1.0. Inclut la mise à jour 5.1.1 pas encore publiée dans le registre.

- Go 1.27.3 corrige CVE-2026-111943 en retirant la confiance aux certificats intermédiaires concernés.
- Les étapes exécutées sur l'hôte qui réussissent n'échouent plus lorsqu'un processus en arrière-plan garde leur sortie ouverte.
- Corrige la lecture et l'écriture des scalaires de bloc et repliés YAML ; les modifications de configuration ne coupent plus les lignes.
- Les contextes de construction Docker ignorent les fichiers illisibles avec un avertissement et ne conservent plus les attributs security.capability. Les serveurs de cache et d'artefacts prennent en charge HEAD, mais ne redirigent plus les barres finales et ne répondent plus à OPTIONS.
- Télécharge chaque action une fois par tâche sous forme d'archive, avec de nouvelles tentatives et git en solution de repli ; corrige les erreurs "cannot lock ref" et les commits obsolètes après le déplacement d'une branche ou d'un tag.
- Supprime les réseaux des tâches même lorsque la suppression des conteneurs est lente et récupère les réseaux et volumes orphelins après 10 minutes.

[Notes de version 5.2.0](https://gitea.com/gitea/runner/releases/tag/v5.2.0) · [Notes de version 5.1.1](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
