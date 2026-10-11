import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.0.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.0.0.

**Breaking changes**

- \`builtin:checkout\` now runs Git inside the job: job images need Git 2.34.1 or newer and access to Gitea. It removes untracked and ignored files unless \`clean: false\` is set, and fails if a triggering tag moved.
- Jobs need a nonempty \`runs-on\`, except calls to reusable workflows.
- Config values expand \`\${NAME}\`; use \`$\${NAME}\` for a literal. Unprivileged jobs ignore workflow container log-driver and OOM options.

**Features and fixes**

- Built-in checkout supports SSH keys, LFS, submodules, sparse checkout and partial clones, and persists credentials for later fetches and pushes.
- Matrix include/exclude matching is case-insensitive. The runner image now includes an SSH client for SSH action and reusable-workflow downloads.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v5.0.0)`,
    es_ES: `Gitea Runner actualizado a 5.0.0.

**Cambios incompatibles**

- \`builtin:checkout\` ejecuta Git dentro del trabajo: las imágenes necesitan Git 2.34.1 o posterior y acceso a Gitea. Elimina los archivos sin seguimiento e ignorados salvo que se establezca \`clean: false\`, y falla si se movió la etiqueta que inició el flujo.
- Los trabajos necesitan un \`runs-on\` no vacío, excepto las llamadas a flujos reutilizables.
- Los valores de configuración expanden \`\${NAME}\`; usa \`$\${NAME}\` para un valor literal. Los trabajos sin privilegios ignoran las opciones de registro y OOM del contenedor del flujo.

**Funcionalidades y correcciones**

- El checkout integrado admite claves SSH, LFS, submódulos, checkout disperso y clones parciales, y conserva las credenciales para posteriores descargas y envíos.
- La coincidencia de include/exclude de la matriz no distingue mayúsculas. La imagen del ejecutor incluye ahora un cliente SSH para descargar acciones y flujos reutilizables por SSH.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v5.0.0)`,
    de_DE: `Gitea Runner auf 5.0.0 aktualisiert.

**Inkompatible Änderungen**

- \`builtin:checkout\` führt Git im Job aus: Job-Images benötigen Git ab 2.34.1 und Zugriff auf Gitea. Nicht verfolgte und ignorierte Dateien werden ohne \`clean: false\` gelöscht; wurde das auslösende Tag verschoben, schlägt der Checkout fehl.
- Jobs benötigen ein nicht leeres \`runs-on\`, außer beim Aufruf wiederverwendbarer Workflows.
- Konfigurationswerte ersetzen \`\${NAME}\`; für einen literalen Wert dient \`$\${NAME}\`. Unprivilegierte Jobs ignorieren Protokollierungs- und OOM-Optionen aus den Container-Optionen des Workflows.

**Funktionen und Fehlerbehebungen**

- Der integrierte Checkout unterstützt SSH-Schlüssel, LFS, Submodule, Sparse Checkout und partielle Klone und behält Zugangsdaten für spätere Fetches und Pushes.
- Include/Exclude-Abgleiche der Matrix ignorieren Groß- und Kleinschreibung. Das Runner-Image enthält nun einen SSH-Client für Downloads von Actions und wiederverwendbaren Workflows über SSH.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v5.0.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.0.0.

**Zmiany niezgodne wstecznie**

- \`builtin:checkout\` uruchamia Git wewnątrz zadania: obrazy zadań wymagają Git 2.34.1 lub nowszego i dostępu do Gitea. Usuwa pliki nieśledzone i ignorowane, chyba że ustawiono \`clean: false\`, i kończy się błędem, gdy przesunięto tag wyzwalający przepływ.
- Zadania wymagają niepustego \`runs-on\`, z wyjątkiem wywołań przepływów wielokrotnego użytku.
- Wartości konfiguracji rozwijają \`\${NAME}\`; użyj \`$\${NAME}\` dla wartości dosłownej. Zadania bez uprawnień ignorują opcje logowania i OOM kontenera podane w przepływie.

**Funkcje i poprawki**

- Wbudowany checkout obsługuje klucze SSH, LFS, podmoduły, sparse checkout i częściowe klony oraz zachowuje dane uwierzytelniające dla późniejszych operacji fetch i push.
- Dopasowanie include/exclude macierzy nie rozróżnia wielkości liter. Obraz runnera zawiera teraz klienta SSH do pobierania akcji i przepływów wielokrotnego użytku przez SSH.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v5.0.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.0.0.

**Changements incompatibles**

- \`builtin:checkout\` exécute Git dans la tâche : les images doivent fournir Git 2.34.1 ou ultérieur et accéder à Gitea. Les fichiers non suivis et ignorés sont supprimés sauf avec \`clean: false\`, et le checkout échoue si le tag déclencheur a été déplacé.
- Les tâches doivent avoir un \`runs-on\` non vide, sauf les appels de workflows réutilisables.
- Les valeurs de configuration développent \`\${NAME}\` ; utilisez \`$\${NAME}\` pour une valeur littérale. Les tâches non privilégiées ignorent les options de journalisation et OOM du conteneur définies par le workflow.

**Fonctionnalités et corrections**

- Le checkout intégré prend en charge les clés SSH, LFS, les sous-modules, le checkout partiel et les clones partiels, et conserve les identifiants pour les fetch et push suivants.
- La correspondance include/exclude des matrices ignore la casse. L'image de l'exécuteur inclut désormais un client SSH pour télécharger les actions et workflows réutilisables par SSH.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v5.0.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
