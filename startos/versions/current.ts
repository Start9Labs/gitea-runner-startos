import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.0.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.0.0.

- The stock \`actions/upload-artifact\` and \`actions/download-artifact\` v4.4.0 and newer now work: the runner serves the cache service v2 API and patches the official actions to reach it, so the \`gitea-upload-artifact\` fork is no longer needed.
- \`container.options\` that reach the runner host (such as joining its process namespace) are now dropped with a warning unless \`container.privileged\` is on. This package runs each job unprivileged, so a workflow relying on those options will see them ignored.
- New job hooks (\`job_started\`, \`job_completed\`), proxy variables passed through to jobs and services, and masking of secrets that reach the log in an encoded form.
- Fixes: per-job container networks are no longer leaked, symlinked container paths resolve correctly, and several panics were fixed.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.0.0`,
    es_ES: `Gitea Runner actualizado a 3.0.0.

- Las acciones oficiales \`actions/upload-artifact\` y \`actions/download-artifact\` v4.4.0 y posteriores ya funcionan: el ejecutor sirve la API del servicio de caché v2 y ajusta las acciones oficiales para que la utilicen, por lo que ya no hace falta la bifurcación \`gitea-upload-artifact\`.
- Las opciones de \`container.options\` que alcanzan el anfitrión del ejecutor (por ejemplo, unirse a su espacio de nombres de procesos) ahora se descartan con una advertencia salvo que \`container.privileged\` esté activado. Este paquete ejecuta cada tarea sin privilegios, así que un flujo de trabajo que dependa de esas opciones las verá ignoradas.
- Nuevos ganchos de tarea (\`job_started\`, \`job_completed\`), variables de proxy propagadas a tareas y servicios, y enmascarado de secretos que llegan al registro en forma codificada.
- Correcciones: ya no se filtran las redes de contenedor por tarea, las rutas de contenedor con enlaces simbólicos se resuelven correctamente y se corrigieron varios pánicos.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.0.0`,
    de_DE: `Gitea Runner auf 3.0.0 aktualisiert.

- Die originalen Aktionen \`actions/upload-artifact\` und \`actions/download-artifact\` ab v4.4.0 funktionieren jetzt: Der Runner stellt die Cache-Service-v2-API bereit und passt die offiziellen Aktionen so an, dass sie diese erreichen — der Fork \`gitea-upload-artifact\` wird nicht mehr benötigt.
- \`container.options\`, die den Runner-Host erreichen (etwa der Beitritt zu dessen Prozess-Namensraum), werden jetzt mit einer Warnung verworfen, sofern \`container.privileged\` nicht aktiviert ist. Dieses Paket führt jeden Auftrag unprivilegiert aus, daher werden solche Optionen in Workflows ignoriert.
- Neue Job-Hooks (\`job_started\`, \`job_completed\`), Proxy-Variablen werden an Aufträge und Dienste weitergereicht, und codiert im Protokoll auftauchende Geheimnisse werden maskiert.
- Fehlerbehebungen: Container-Netzwerke einzelner Aufträge bleiben nicht mehr zurück, Pfade mit symbolischen Links im Container werden korrekt aufgelöst, und mehrere Panics wurden behoben.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.0.0`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.0.0.

- Oryginalne akcje \`actions/upload-artifact\` i \`actions/download-artifact\` w wersji 4.4.0 i nowszych już działają: runner udostępnia API usługi pamięci podręcznej v2 i dostosowuje oficjalne akcje, aby z niego korzystały, więc fork \`gitea-upload-artifact\` nie jest już potrzebny.
- Opcje \`container.options\` sięgające hosta runnera (np. dołączenie do jego przestrzeni nazw procesów) są teraz odrzucane z ostrzeżeniem, chyba że włączono \`container.privileged\`. Ten pakiet uruchamia każde zadanie bez uprawnień, więc przepływ pracy zależny od takich opcji zobaczy je zignorowane.
- Nowe haki zadań (\`job_started\`, \`job_completed\`), zmienne proxy przekazywane do zadań i usług oraz maskowanie sekretów trafiających do dziennika w postaci zakodowanej.
- Poprawki: sieci kontenerów poszczególnych zadań nie są już porzucane, ścieżki z dowiązaniami symbolicznymi w kontenerze są poprawnie rozwiązywane i naprawiono kilka panik.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.0.0`,
    fr_FR: `Gitea Runner mis à jour vers 3.0.0.

- Les actions officielles \`actions/upload-artifact\` et \`actions/download-artifact\` v4.4.0 et ultérieures fonctionnent désormais : l'exécuteur fournit l'API du service de cache v2 et adapte les actions officielles pour qu'elles l'utilisent, le fork \`gitea-upload-artifact\` n'est donc plus nécessaire.
- Les \`container.options\` qui atteignent l'hôte de l'exécuteur (par exemple rejoindre son espace de noms de processus) sont maintenant écartées avec un avertissement sauf si \`container.privileged\` est activé. Ce paquet exécute chaque tâche sans privilèges : un workflow reposant sur ces options les verra ignorées.
- Nouveaux hooks de tâche (\`job_started\`, \`job_completed\`), variables de proxy transmises aux tâches et aux services, et masquage des secrets arrivant encodés dans le journal.
- Corrections : les réseaux de conteneurs propres à chaque tâche ne sont plus abandonnés, les chemins de conteneur passant par des liens symboliques sont résolus correctement, et plusieurs paniques ont été corrigées.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.0.0`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
