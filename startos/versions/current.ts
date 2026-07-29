import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.3.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 2.3.0.

- Job logs now open with a "Set up job" section and report the runner's name, environment and workspace.
- Docker actions run their pre- and post-entrypoint steps, and \`container.options\` accepts \`--platform\` and \`--pull\`.
- A cancelled step is reported as an interruption rather than a failure, and leftover service containers are cleaned up when job setup fails.
- Security updates to the bundled Go networking and telemetry libraries.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v2.3.0 and https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    es_ES: `Gitea Runner actualizado a 2.3.0.

- Los registros de las tareas comienzan ahora con una sección «Set up job» e indican el nombre del ejecutor, su entorno y su espacio de trabajo.
- Las acciones Docker ejecutan sus pasos de pre y post entrypoint, y \`container.options\` admite \`--platform\` y \`--pull\`.
- Un paso cancelado se informa como interrupción y no como fallo, y los contenedores de servicio sobrantes se limpian cuando falla la preparación de la tarea.
- Actualizaciones de seguridad de las bibliotecas Go de red y telemetría incluidas.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v2.3.0 y https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    de_DE: `Gitea Runner auf 2.3.0 aktualisiert.

- Job-Protokolle beginnen jetzt mit einem Abschnitt „Set up job“ und nennen Name, Umgebung und Arbeitsverzeichnis des Runners.
- Docker-Aktionen führen ihre Pre- und Post-Entrypoint-Schritte aus, und \`container.options\` akzeptiert \`--platform\` und \`--pull\`.
- Ein abgebrochener Schritt wird als Unterbrechung statt als Fehler gemeldet, und übrig gebliebene Service-Container werden aufgeräumt, wenn die Job-Einrichtung fehlschlägt.
- Sicherheitsaktualisierungen der mitgelieferten Go-Netzwerk- und Telemetriebibliotheken.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v2.3.0 und https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    pl_PL: `Zaktualizowano Gitea Runner do 2.3.0.

- Dzienniki zadań zaczynają się teraz sekcją „Set up job” i podają nazwę runnera, jego środowisko oraz katalog roboczy.
- Akcje Docker wykonują kroki pre- i post-entrypoint, a \`container.options\` przyjmuje \`--platform\` i \`--pull\`.
- Anulowany krok jest zgłaszany jako przerwanie, a nie błąd, a pozostałe kontenery usług są usuwane, gdy przygotowanie zadania się nie powiedzie.
- Aktualizacje bezpieczeństwa dołączonych bibliotek sieciowych i telemetrycznych Go.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v2.3.0 i https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
    fr_FR: `Gitea Runner mis à jour vers 2.3.0.

- Les journaux de tâches commencent désormais par une section « Set up job » et indiquent le nom de l'exécuteur, son environnement et son espace de travail.
- Les actions Docker exécutent leurs étapes pre- et post-entrypoint, et \`container.options\` accepte \`--platform\` et \`--pull\`.
- Une étape annulée est signalée comme une interruption et non comme un échec, et les conteneurs de service restants sont nettoyés lorsque la préparation de la tâche échoue.
- Mises à jour de sécurité des bibliothèques Go de réseau et de télémétrie incluses.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v2.3.0 et https://gitea.com/gitea/runner/releases/tag/v2.2.0`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
