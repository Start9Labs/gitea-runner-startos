import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.1.1:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.1.1.

- Downloads each action once per job as an archive, with retries and a git fallback.
- Fixes action downloads failing with "cannot lock ref" or using stale commits after a branch or tag moves.
- Removes job networks even when container removal is slow, and reclaims orphaned job networks and volumes after 10 minutes.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    es_ES: `Gitea Runner actualizado a 5.1.1.

- Descarga cada acción una vez por trabajo como archivo comprimido, con reintentos y git como alternativa.
- Corrige las descargas de acciones que fallan con "cannot lock ref" o usan commits obsoletos tras mover una rama o etiqueta.
- Elimina las redes de los trabajos aunque la eliminación de contenedores sea lenta y recupera las redes y los volúmenes huérfanos tras 10 minutos.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    de_DE: `Gitea Runner auf 5.1.1 aktualisiert.

- Lädt jede Action einmal pro Job als Archiv herunter, mit Wiederholungsversuchen und git als Ausweichmethode.
- Behebt Action-Downloads, die mit "cannot lock ref" scheitern oder nach dem Verschieben eines Branches oder Tags veraltete Commits verwenden.
- Entfernt Job-Netzwerke auch bei langsamer Container-Entfernung und bereinigt verwaiste Job-Netzwerke und Volumes nach 10 Minuten.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.1.1.

- Pobiera każdą akcję raz na zadanie jako archiwum, z ponawianiem prób i git jako metodą zapasową.
- Naprawia pobieranie akcji kończące się błędem "cannot lock ref" lub używające nieaktualnych commitów po przesunięciu gałęzi lub tagu.
- Usuwa sieci zadań nawet przy powolnym usuwaniu kontenerów i odzyskuje osierocone sieci i woluminy zadań po 10 minutach.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.1.1.

- Télécharge chaque action une fois par tâche sous forme d'archive, avec de nouvelles tentatives et git en solution de repli.
- Corrige les téléchargements d'actions qui échouent avec "cannot lock ref" ou utilisent des commits obsolètes après le déplacement d'une branche ou d'un tag.
- Supprime les réseaux des tâches même lorsque la suppression des conteneurs est lente et récupère les réseaux et volumes orphelins après 10 minutes.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v5.1.1)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
