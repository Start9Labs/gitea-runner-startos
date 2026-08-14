import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.1.0:1',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.1.0.

- Workflows can no longer use the deprecated \`set-env\` and \`add-path\` commands, matching GitHub's runner. Set \`ACTIONS_ALLOW_UNSECURE_COMMANDS\` on the step or job if a workflow still needs them.
- A job now waits for its service containers to report healthy before it starts, when the service image declares a health check.
- Error and warning annotations render the file and line they point at.
- Also carries the 3.0.1 and 3.0.2 fixes: the results service is served from the cache server, completing the cache v2 work behind \`actions/upload-artifact\` and \`actions/download-artifact\`, and a \`format()\` panic that could abort a workflow.

Packaging: gitea-runner's example config is now fully commented out, so the runner's config file is written with the new \`config\` commands. The labels set in the Configure action apply as before. This release also fixes two problems with the bundled Podman engine: jobs failing before their first step because it could not open the tunnel device that gives each job container a network, and job images containing files not owned by root — most Ubuntu-based images — failing to unpack.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.1.0`,
    es_ES: `Gitea Runner actualizado a 3.1.0.

- Los flujos de trabajo ya no pueden usar los comandos obsoletos \`set-env\` y \`add-path\`, igual que el ejecutor de GitHub. Define \`ACTIONS_ALLOW_UNSECURE_COMMANDS\` en el paso o en el trabajo si algún flujo aún los necesita.
- Un trabajo espera ahora a que sus contenedores de servicio informen de buen estado antes de empezar, cuando la imagen del servicio declara una comprobación de salud.
- Las anotaciones de error y advertencia muestran el archivo y la línea a los que apuntan.
- Incluye además las correcciones de 3.0.1 y 3.0.2: el servicio de resultados se sirve desde el servidor de caché, completando el trabajo de caché v2 detrás de \`actions/upload-artifact\` y \`actions/download-artifact\`, y un pánico en \`format()\` que podía abortar un flujo de trabajo.

Empaquetado: la configuración de ejemplo de gitea-runner viene ahora completamente comentada, así que el archivo de configuración del ejecutor se escribe con los nuevos comandos \`config\`. Las etiquetas definidas en la acción Configurar se aplican igual que antes. Este lanzamiento corrige además dos problemas del motor Podman incluido: los trabajos fallaban antes de su primer paso porque no podía abrir el dispositivo de túnel que da red a cada contenedor de trabajo, y las imágenes de trabajo con archivos que no pertenecen a root —la mayoría de las basadas en Ubuntu— no se descomprimían.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.1.0`,
    de_DE: `Gitea Runner auf 3.1.0 aktualisiert.

- Workflows können die veralteten Befehle \`set-env\` und \`add-path\` nicht mehr verwenden, wie beim GitHub-Runner. Setze \`ACTIONS_ALLOW_UNSECURE_COMMANDS\` im Schritt oder Job, falls ein Workflow sie weiterhin braucht.
- Ein Job wartet jetzt darauf, dass seine Service-Container als gesund gemeldet werden, sofern das Service-Image einen Health-Check definiert.
- Fehler- und Warnungsannotationen zeigen die Datei und Zeile, auf die sie verweisen.
- Enthält außerdem die Korrekturen aus 3.0.1 und 3.0.2: Der Ergebnisdienst wird vom Cache-Server bereitgestellt und vervollständigt damit die Cache-v2-Arbeit hinter \`actions/upload-artifact\` und \`actions/download-artifact\`, sowie einen Panic in \`format()\`, der einen Workflow abbrechen konnte.

Paketierung: Die Beispielkonfiguration von gitea-runner ist jetzt vollständig auskommentiert, daher wird die Konfigurationsdatei des Runners mit den neuen \`config\`-Befehlen geschrieben. Die in der Aktion „Konfigurieren“ gesetzten Labels gelten wie bisher. Diese Version behebt außerdem zwei Probleme der mitgelieferten Podman-Engine: Jobs scheiterten vor ihrem ersten Schritt, weil sie das Tunnelgerät nicht öffnen konnte, das jedem Job-Container ein Netzwerk gibt, und Job-Images mit Dateien, die nicht root gehören — die meisten Ubuntu-basierten Images — ließen sich nicht entpacken.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.1.0`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.1.0.

- Przepływy pracy nie mogą już używać przestarzałych poleceń \`set-env\` i \`add-path\`, tak jak w runnerze GitHuba. Ustaw \`ACTIONS_ALLOW_UNSECURE_COMMANDS\` w kroku lub zadaniu, jeśli przepływ nadal ich potrzebuje.
- Zadanie czeka teraz, aż jego kontenery usług zgłoszą poprawny stan, o ile obraz usługi definiuje kontrolę kondycji.
- Adnotacje błędów i ostrzeżeń pokazują plik i wiersz, na które wskazują.
- Zawiera także poprawki z 3.0.1 i 3.0.2: usługa wyników jest obsługiwana przez serwer pamięci podręcznej, co domyka prace nad pamięcią podręczną v2 stojące za \`actions/upload-artifact\` i \`actions/download-artifact\`, oraz panikę w \`format()\`, która mogła przerwać przepływ pracy.

Pakowanie: przykładowa konfiguracja gitea-runner jest teraz w całości zakomentowana, więc plik konfiguracyjny runnera powstaje przy użyciu nowych poleceń \`config\`. Etykiety ustawione w akcji Konfiguruj działają tak jak dotąd. To wydanie naprawia też dwa problemy wbudowanego silnika Podman: zadania kończyły się niepowodzeniem przed pierwszym krokiem, bo nie mógł on otworzyć urządzenia tunelowego dającego sieć każdemu kontenerowi zadania, a obrazy zadań zawierające pliki nienależące do roota — czyli większość opartych na Ubuntu — nie dawały się rozpakować.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.1.0`,
    fr_FR: `Gitea Runner mis à jour vers 3.1.0.

- Les workflows ne peuvent plus utiliser les commandes obsolètes \`set-env\` et \`add-path\`, comme sur l'exécuteur GitHub. Définissez \`ACTIONS_ALLOW_UNSECURE_COMMANDS\` sur l'étape ou le job si un workflow en a encore besoin.
- Un job attend désormais que ses conteneurs de service se déclarent sains avant de démarrer, lorsque l'image du service définit une vérification d'état.
- Les annotations d'erreur et d'avertissement affichent le fichier et la ligne qu'elles désignent.
- Intègre également les correctifs de 3.0.1 et 3.0.2 : le service de résultats est fourni par le serveur de cache, ce qui achève le travail sur le cache v2 derrière \`actions/upload-artifact\` et \`actions/download-artifact\`, ainsi qu'une panique dans \`format()\` qui pouvait interrompre un workflow.

Empaquetage : la configuration d'exemple de gitea-runner est désormais entièrement commentée, le fichier de configuration de l'exécuteur est donc écrit avec les nouvelles commandes \`config\`. Les libellés définis dans l'action Configurer s'appliquent comme auparavant. Cette version corrige aussi deux problèmes du moteur Podman intégré : les jobs échouaient avant leur première étape car il ne parvenait pas à ouvrir le périphérique tunnel qui donne un réseau à chaque conteneur de job, et les images de job contenant des fichiers n'appartenant pas à root — la plupart des images basées sur Ubuntu — ne se décompressaient pas.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.1.0`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
