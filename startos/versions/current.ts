import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '4.0.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 4.0.0.

- Jobs can use \`builtin:checkout\` without downloading an action or requiring Node in the job image.
- Steps can reference actions hosted on this Gitea with the \`self:\` prefix in \`uses\`.
- Fixes the Docker socket in Podman jobs and jobs skipped by a failing \`if:\` expression.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    es_ES: `Gitea Runner actualizado a 4.0.0.

- Los trabajos pueden usar \`builtin:checkout\` sin descargar una acción ni necesitar Node en la imagen del trabajo.
- Los pasos pueden hacer referencia a acciones alojadas en este Gitea con el prefijo \`self:\` en \`uses\`.
- Corrige el socket de Docker en los trabajos con Podman y los trabajos omitidos por una expresión \`if:\` fallida.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    de_DE: `Gitea Runner auf 4.0.0 aktualisiert.

- Jobs können \`builtin:checkout\` ohne Action-Download und ohne Node im Job-Image verwenden.
- Schritte können mit dem Präfix \`self:\` in \`uses\` auf Actions verweisen, die auf diesem Gitea liegen.
- Behebt den Docker-Socket in Podman-Jobs und das Überspringen von Jobs bei fehlgeschlagenem \`if:\`-Ausdruck.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 4.0.0.

- Zadania mogą używać \`builtin:checkout\` bez pobierania akcji i bez Node w obrazie zadania.
- Kroki mogą odwoływać się do akcji hostowanych na tym Gitea za pomocą prefiksu \`self:\` w \`uses\`.
- Naprawiono gniazdo Dockera w zadaniach Podmana i pomijanie zadań po nieudanej ewaluacji \`if:\`.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 4.0.0.

- Les tâches peuvent utiliser \`builtin:checkout\` sans télécharger d'action ni nécessiter Node dans l'image de la tâche.
- Les étapes peuvent référencer des actions hébergées sur ce Gitea avec le préfixe \`self:\` dans \`uses\`.
- Corrige le socket Docker dans les tâches Podman et l'omission des tâches dont l'expression \`if:\` échoue.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v4.0.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
