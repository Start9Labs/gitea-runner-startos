import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '4.0.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 4.0.0.

- Jobs can use \`builtin:checkout\` without downloading an action or requiring Node in the job image.
- Cache requests now pass through the runner; the default isolated job network works without additional configuration. Jobs explicitly using \`container.network: bridge\` cannot reach the runner's cache. Use the default network or a user-defined one.
- Custom \`valid_volumes\` patterns must use \`**\` instead of \`*\` to match paths across directories.
- Fixes Podman job socket mounts and jobs skipped by a failing \`if:\` expression.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    es_ES: `Gitea Runner actualizado a 4.0.0.

- Los trabajos pueden usar \`builtin:checkout\` sin descargar una acción ni necesitar Node en la imagen del trabajo.
- Las solicitudes de caché pasan ahora por el runner; la red aislada predeterminada funciona sin configuración adicional. Los trabajos que usan explícitamente \`container.network: bridge\` no pueden acceder a la caché del runner. Use la red predeterminada o una definida por el usuario.
- Los patrones personalizados de \`valid_volumes\` deben usar \`**\` en lugar de \`*\` para abarcar varios directorios.
- Corrige el montaje del socket en trabajos con Podman y los trabajos omitidos por una expresión \`if:\` fallida.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    de_DE: `Gitea Runner auf 4.0.0 aktualisiert.

- Jobs können \`builtin:checkout\` ohne Action-Download und ohne Node im Job-Image verwenden.
- Cache-Anfragen laufen jetzt über den Runner; das standardmäßige isolierte Job-Netzwerk funktioniert ohne weitere Konfiguration. Jobs mit explizitem \`container.network: bridge\` erreichen den Runner-Cache nicht. Verwenden Sie das Standardnetzwerk oder ein benutzerdefiniertes Netzwerk.
- Benutzerdefinierte \`valid_volumes\`-Muster benötigen \`**\` statt \`*\`, um Pfade über mehrere Verzeichnisse hinweg zu erfassen.
- Behebt Socket-Einbindungen bei Podman-Jobs und das Überspringen von Jobs bei fehlgeschlagenem \`if:\`-Ausdruck.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 4.0.0.

- Zadania mogą używać \`builtin:checkout\` bez pobierania akcji i bez Node w obrazie zadania.
- Żądania pamięci podręcznej przechodzą teraz przez runner; domyślna izolowana sieć zadań działa bez dodatkowej konfiguracji. Zadania z ustawieniem \`container.network: bridge\` nie mogą połączyć się z pamięcią podręczną runnera. Użyj sieci domyślnej lub zdefiniowanej przez użytkownika.
- Własne wzorce \`valid_volumes\` wymagają \`**\` zamiast \`*\`, aby dopasować ścieżki przez wiele katalogów.
- Naprawiono montowanie gniazda w zadaniach Podmana i pomijanie zadań po nieudanej ewaluacji \`if:\`.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 4.0.0.

- Les tâches peuvent utiliser \`builtin:checkout\` sans télécharger d'action ni nécessiter Node dans l'image de la tâche.
- Les requêtes de cache transitent désormais par le runner ; le réseau isolé par défaut fonctionne sans configuration supplémentaire. Les tâches configurées avec \`container.network: bridge\` ne peuvent pas accéder au cache du runner. Utilisez le réseau par défaut ou un réseau personnalisé.
- Les motifs personnalisés de \`valid_volumes\` doivent utiliser \`**\` plutôt que \`*\` pour couvrir plusieurs répertoires.
- Corrige le montage du socket dans les tâches Podman et l'omission des tâches dont l'expression \`if:\` échoue.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
