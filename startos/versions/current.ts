import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.0.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 6.0.0. Requires StartOS 0.4.2 or later and Gitea 1.26.2 or later, including remote instances.

**Before updating:** replace every \`uses: builtin:checkout\` in your workflows with a version-pinned checkout action, such as \`actions/checkout\` or \`taiki-e/checkout-action\` (without Node). Built-in checkout has been removed.

Fixes jobs hanging after cancellation when Docker stops responding, expression handling, and log-group commands.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v6.0.0)`,
    es_ES: `Gitea Runner actualizado a 6.0.0. Requiere StartOS 0.4.2 o posterior y Gitea 1.26.2 o posterior, incluidas las instancias remotas.

**Antes de actualizar:** sustituya cada \`uses: builtin:checkout\` de sus flujos por una acción de checkout fijada a una versión, como \`actions/checkout\` o \`taiki-e/checkout-action\` (sin Node). Se ha eliminado el checkout integrado.

Corrige los trabajos bloqueados tras cancelarlos cuando Docker deja de responder, la gestión de expresiones y los comandos de grupos de registros.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v6.0.0)`,
    de_DE: `Gitea Runner auf 6.0.0 aktualisiert. Erfordert StartOS ab 0.4.2 und Gitea ab 1.26.2, auch auf entfernten Instanzen.

**Vor dem Update:** Jedes \`uses: builtin:checkout\` in Workflows durch eine versionsgebundene Checkout-Action wie \`actions/checkout\` oder \`taiki-e/checkout-action\` (ohne Node) ersetzen. Der integrierte Checkout wurde entfernt.

Behebt nach Abbruch hängende Jobs bei nicht antwortendem Docker sowie die Verarbeitung von Ausdrücken und Protokollgruppenbefehlen.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v6.0.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 6.0.0. Wymaga StartOS 0.4.2 lub nowszego i Gitea 1.26.2 lub nowszego, także na zdalnych instancjach.

**Przed aktualizacją:** zastąp każde \`uses: builtin:checkout\` w przepływach akcją checkout przypiętą do wersji, taką jak \`actions/checkout\` lub \`taiki-e/checkout-action\` (bez Node). Wbudowany checkout został usunięty.

Naprawia zawieszanie zadań po anulowaniu, gdy Docker nie odpowiada, obsługę wyrażeń oraz polecenia grup dziennika.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v6.0.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 6.0.0. Nécessite StartOS 0.4.2 ou ultérieur et Gitea 1.26.2 ou ultérieur, y compris pour les instances distantes.

**Avant la mise à jour :** remplacez chaque \`uses: builtin:checkout\` de vos workflows par une action de checkout épinglée à une version, comme \`actions/checkout\` ou \`taiki-e/checkout-action\` (sans Node). Le checkout intégré a été supprimé.

Corrige les tâches bloquées après annulation lorsque Docker ne répond plus, le traitement des expressions et les commandes de groupes de journaux.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v6.0.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
