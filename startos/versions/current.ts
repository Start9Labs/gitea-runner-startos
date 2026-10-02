import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '4.1.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 4.1.0. Prevents action downloads from hanging on stalled HTTP/2 connections, improves Docker action and job environment compatibility with GitHub Actions, and fails unsuccessful registration attempts faster. Task-start logs now include task, job and run identifiers.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v4.1.0)`,
    es_ES: `Gitea Runner actualizado a 4.1.0. Evita que las descargas de acciones se bloqueen por conexiones HTTP/2 estancadas, mejora la compatibilidad de las acciones Docker y los entornos de trabajo con GitHub Actions y acelera el fallo de los intentos de registro infructuosos. Los registros de inicio de tareas ahora incluyen los identificadores de tarea, trabajo y ejecución.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v4.1.0)`,
    de_DE: `Gitea Runner auf 4.1.0 aktualisiert. Verhindert hängende Action-Downloads bei blockierten HTTP/2-Verbindungen, verbessert die Kompatibilität von Docker-Actions und Job-Umgebungen mit GitHub Actions und lässt erfolglose Registrierungsversuche schneller fehlschlagen. Protokolle zum Aufgabenstart enthalten jetzt Aufgaben-, Job- und Ausführungskennungen.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v4.1.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 4.1.0. Zapobiega zawieszaniu pobierania akcji przy zablokowanych połączeniach HTTP/2, poprawia zgodność akcji Docker i środowisk zadań z GitHub Actions oraz szybciej kończy nieudane próby rejestracji. Logi rozpoczęcia zadań zawierają teraz identyfikatory zadania, pracy i uruchomienia.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v4.1.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 4.1.0. Empêche les téléchargements d'actions de rester bloqués sur des connexions HTTP/2 figées, améliore la compatibilité des actions Docker et des environnements de tâches avec GitHub Actions et fait échouer plus rapidement les tentatives d'enregistrement infructueuses. Les journaux de démarrage des tâches incluent désormais les identifiants de tâche, de job et d'exécution.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v4.1.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
