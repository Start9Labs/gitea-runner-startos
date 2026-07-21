import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 2.1.0.

- Honors \`GITEA_RUNNER_LABELS\` on daemon start and accepts labels containing a colon.
- Adds a \`--token-file\` flag to the \`register\` command.
- Adds a \`bug-report\` subcommand, \`exec --eventpath\`, and \`runner.set_act_env\`.
- Ignores blank lines and decodes UTF-16 in runner env files.
- Migrates the package to start-sdk 2.0 (requires StartOS 0.4.0-beta.10 or later).

Full release notes: https://gitea.com/gitea/runner/releases/tag/v2.1.0`,
    es_ES: `Actualiza Gitea Runner a 2.1.0.

- Respeta \`GITEA_RUNNER_LABELS\` al iniciar el demonio y acepta etiquetas que contengan dos puntos.
- Añade la opción \`--token-file\` al comando \`register\`.
- Añade el subcomando \`bug-report\`, \`exec --eventpath\` y \`runner.set_act_env\`.
- Ignora las líneas en blanco y decodifica UTF-16 en los archivos de entorno del runner.
- Migra el paquete a start-sdk 2.0 (requiere StartOS 0.4.0-beta.10 o posterior).

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v2.1.0`,
    de_DE: `Aktualisiert Gitea Runner auf 2.1.0.

- Berücksichtigt \`GITEA_RUNNER_LABELS\` beim Start des Daemons und akzeptiert Labels mit Doppelpunkt.
- Fügt dem Befehl \`register\` die Option \`--token-file\` hinzu.
- Ergänzt den Unterbefehl \`bug-report\`, \`exec --eventpath\` und \`runner.set_act_env\`.
- Ignoriert Leerzeilen und dekodiert UTF-16 in den Umgebungsdateien des Runners.
- Stellt das Paket auf start-sdk 2.0 um (erfordert StartOS 0.4.0-beta.10 oder neuer).

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v2.1.0`,
    pl_PL: `Aktualizuje Gitea Runner do 2.1.0.

- Uwzględnia \`GITEA_RUNNER_LABELS\` przy starcie demona i akceptuje etykiety zawierające dwukropek.
- Dodaje flagę \`--token-file\` do polecenia \`register\`.
- Dodaje podpolecenie \`bug-report\`, \`exec --eventpath\` oraz \`runner.set_act_env\`.
- Ignoruje puste wiersze i dekoduje UTF-16 w plikach środowiskowych runnera.
- Przenosi pakiet na start-sdk 2.0 (wymaga StartOS 0.4.0-beta.10 lub nowszego).

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v2.1.0`,
    fr_FR: `Met à jour Gitea Runner vers 2.1.0.

- Prend en compte \`GITEA_RUNNER_LABELS\` au démarrage du démon et accepte les libellés contenant un deux-points.
- Ajoute l'option \`--token-file\` à la commande \`register\`.
- Ajoute la sous-commande \`bug-report\`, \`exec --eventpath\` et \`runner.set_act_env\`.
- Ignore les lignes vides et décode l'UTF-16 dans les fichiers d'environnement du runner.
- Fait passer le paquet à start-sdk 2.0 (nécessite StartOS 0.4.0-beta.10 ou une version ultérieure).

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v2.1.0`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
