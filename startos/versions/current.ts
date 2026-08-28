import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.3.1:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.3.1.

- Secrets are now masked everywhere they leave a job: uploaded log rows, the on-disk job log, the runner's own log, job summaries, job outputs, and the container name taken from the job name.
- **Behavior change:** a job output whose value contains a secret is skipped with a warning instead of sent, matching GitHub, so a later job reading it gets an empty value.
- **Behavior change:** a workflow's \`container.options\` can no longer name a file on the runner or bind an arbitrary host path through a volume driver option, and a bare \`--env NAME\` no longer takes its value from the runner's own environment. Options set by the runner's own configuration are kept.
- A step's \`with:\` values no longer leak into its \`inputs\` context, where a colliding key could flip an \`if:\` condition or forge an input.
- A workflow whose matrix fails to expand now fails, instead of reporting success without having run anything.
- Volumes declared on service containers are honored under the runner's volume policy instead of being dropped silently.
- Log rows are reported with the step they belong to, so lines no longer land under "Complete job".
- Updated the Go toolchain to 1.27, including the 1.26.6 security fixes.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.3.1`,
    es_ES: `Gitea Runner actualizado a 3.3.1.

- Los secretos ahora se enmascaran en todos los sitios por los que salen de un trabajo: las líneas de registro subidas, el registro del trabajo en disco, el registro del propio ejecutor, los resúmenes de trabajo, las salidas del trabajo y el nombre de contenedor tomado del nombre del trabajo.
- **Cambio de comportamiento:** una salida de trabajo cuyo valor contiene un secreto se omite con una advertencia en lugar de enviarse, igual que en GitHub, así que un trabajo posterior que la lea obtiene un valor vacío.
- **Cambio de comportamiento:** las \`container.options\` de un flujo de trabajo ya no pueden nombrar un archivo del ejecutor ni montar una ruta arbitraria del anfitrión mediante una opción de controlador de volumen, y un \`--env NAME\` a secas ya no toma su valor del entorno del propio ejecutor. Las opciones definidas por la configuración del ejecutor se conservan.
- Los valores \`with:\` de un paso ya no se filtran a su contexto \`inputs\`, donde una clave coincidente podía alterar una condición \`if:\` o falsificar una entrada.
- Un flujo de trabajo cuya matriz no se expande ahora falla, en lugar de informar de éxito sin haber ejecutado nada.
- Los volúmenes declarados en contenedores de servicio se respetan según la política de volúmenes del ejecutor, en vez de descartarse en silencio.
- Las líneas de registro se informan junto con el paso al que pertenecen, así que ya no acaban bajo «Complete job».
- Cadena de herramientas de Go actualizada a la 1.27, incluidas las correcciones de seguridad de la 1.26.6.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.3.1`,
    de_DE: `Gitea Runner auf 3.3.1 aktualisiert.

- Secrets werden jetzt überall dort maskiert, wo sie einen Job verlassen: in hochgeladenen Log-Zeilen, im Job-Log auf der Festplatte, im Log des Runners selbst, in Job-Zusammenfassungen, in Job-Ausgaben und im Container-Namen, der aus dem Job-Namen entsteht.
- **Verhaltensänderung:** Eine Job-Ausgabe, deren Wert ein Secret enthält, wird mit einer Warnung übersprungen statt gesendet — wie bei GitHub. Ein späterer Job, der sie liest, erhält einen leeren Wert.
- **Verhaltensänderung:** Die \`container.options\` eines Workflows können keine Datei auf dem Runner mehr benennen und über eine Volume-Treiber-Option keinen beliebigen Host-Pfad mehr einbinden, und ein bloßes \`--env NAME\` übernimmt seinen Wert nicht mehr aus der Umgebung des Runners. Optionen aus der Konfiguration des Runners bleiben erhalten.
- Die \`with:\`-Werte eines Schritts gelangen nicht mehr in dessen \`inputs\`-Kontext, wo ein kollidierender Schlüssel eine \`if:\`-Bedingung umkehren oder eine Eingabe fälschen konnte.
- Ein Workflow, dessen Matrix nicht aufgelöst werden kann, schlägt jetzt fehl, statt Erfolg zu melden, ohne etwas ausgeführt zu haben.
- Volumes, die an Service-Containern deklariert sind, werden gemäß der Volume-Richtlinie des Runners berücksichtigt, statt stillschweigend verworfen zu werden.
- Log-Zeilen werden zusammen mit dem Schritt gemeldet, zu dem sie gehören, sodass Zeilen nicht mehr unter „Complete job“ landen.
- Go-Toolchain auf 1.27 aktualisiert, einschließlich der Sicherheitskorrekturen aus 1.26.6.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.3.1`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.3.1.

- Sekrety są teraz maskowane wszędzie tam, gdzie opuszczają zadanie: w przesyłanych wierszach dziennika, w dzienniku zadania na dysku, w dzienniku samego runnera, w podsumowaniach zadania, w danych wyjściowych zadania oraz w nazwie kontenera tworzonej z nazwy zadania.
- **Zmiana zachowania:** dane wyjściowe zadania, których wartość zawiera sekret, są pomijane z ostrzeżeniem zamiast wysyłane — tak jak w GitHubie — więc późniejsze zadanie, które je odczytuje, dostaje pustą wartość.
- **Zmiana zachowania:** \`container.options\` w przepływie pracy nie mogą już wskazywać pliku na runnerze ani montować dowolnej ścieżki hosta przez opcję sterownika woluminu, a samo \`--env NAME\` nie pobiera już wartości ze środowiska samego runnera. Opcje ustawione w konfiguracji runnera są zachowywane.
- Wartości \`with:\` danego kroku nie trafiają już do jego kontekstu \`inputs\`, gdzie kolidujący klucz mógł odwrócić warunek \`if:\` lub podrobić dane wejściowe.
- Przepływ pracy, którego macierzy nie da się rozwinąć, teraz kończy się błędem zamiast zgłaszać powodzenie bez wykonania czegokolwiek.
- Woluminy zadeklarowane w kontenerach usług są uwzględniane zgodnie z polityką woluminów runnera, zamiast być po cichu pomijane.
- Wiersze dziennika są raportowane razem z krokiem, do którego należą, więc nie trafiają już pod „Complete job”.
- Zaktualizowano zestaw narzędzi Go do 1.27, wraz z poprawkami bezpieczeństwa z 1.26.6.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.3.1`,
    fr_FR: `Gitea Runner mis à jour vers 3.3.1.

- Les secrets sont désormais masqués partout où ils sortent d'un job : lignes de journal envoyées, journal du job sur disque, journal du runner lui-même, résumés de job, sorties de job et nom de conteneur tiré du nom du job.
- **Changement de comportement :** une sortie de job dont la valeur contient un secret est ignorée avec un avertissement au lieu d'être transmise, comme sur GitHub ; un job ultérieur qui la lit obtient donc une valeur vide.
- **Changement de comportement :** les \`container.options\` d'un workflow ne peuvent plus désigner un fichier du runner ni monter un chemin arbitraire de l'hôte via une option de pilote de volume, et un simple \`--env NAME\` ne récupère plus sa valeur dans l'environnement du runner. Les options définies par la configuration du runner sont conservées.
- Les valeurs \`with:\` d'une étape ne débordent plus dans son contexte \`inputs\`, où une clé en conflit pouvait inverser une condition \`if:\` ou forger une entrée.
- Un workflow dont la matrice ne peut pas être développée échoue désormais, au lieu de signaler une réussite sans rien avoir exécuté.
- Les volumes déclarés sur les conteneurs de service sont respectés selon la politique de volumes du runner, au lieu d'être supprimés silencieusement.
- Les lignes de journal sont rapportées avec l'étape à laquelle elles appartiennent, si bien qu'elles n'atterrissent plus sous « Complete job ».
- Chaîne d'outils Go mise à jour vers 1.27, avec les correctifs de sécurité de 1.26.6.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.3.1`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
