import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.5.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.5.0.

**Features**

- Docker-socket jobs can bind-mount job paths without enabling \`bind_workdir\`.
- Whole-value expressions are supported in strategies, environments, inputs, services, and outputs.

**Fixes and improvements**

- Improves job startup, cache requests, and large-workspace cleanup.
- Fixes pnpm workspace mount errors and artifact uploads when isolated job networks cannot reach the cache server or the cache server cannot reach Gitea.
- Improves IPv6 URL handling, cache-server shutdown, and concurrent task admission.

[Full upstream changelog](https://gitea.com/gitea/runner/compare/v3.4.1...v3.5.0)`,
    es_ES: `Gitea Runner actualizado a 3.5.0.

**Funcionalidades**

- Los trabajos con socket de Docker pueden montar rutas del trabajo sin activar \`bind_workdir\`.
- Se admiten expresiones de valor completo en estrategias, entornos, entradas, servicios y salidas.

**Correcciones y mejoras**

- Mejora el inicio de los trabajos, las solicitudes de caché y la limpieza de espacios de trabajo grandes.
- Corrige los errores de montaje del espacio de trabajo de pnpm y la carga de artefactos cuando las redes de trabajo aisladas no pueden acceder al servidor de caché o este no puede acceder a Gitea.
- Mejora la gestión de URL IPv6, el cierre del servidor de caché y la admisión simultánea de tareas.

[Registro de cambios completo](https://gitea.com/gitea/runner/compare/v3.4.1...v3.5.0)`,
    de_DE: `Gitea Runner auf 3.5.0 aktualisiert.

**Funktionen**

- Docker-Socket-Jobs können Job-Pfade ohne aktiviertes \`bind_workdir\` einbinden.
- Ganzwertige Ausdrücke werden in Strategien, Umgebungen, Eingaben, Diensten und Ausgaben unterstützt.

**Fehlerbehebungen und Verbesserungen**

- Verbessert den Job-Start, Cache-Anfragen und die Bereinigung großer Arbeitsbereiche.
- Behebt pnpm-Fehler beim Einbinden des Arbeitsbereichs und Artefakt-Uploads, wenn isolierte Job-Netzwerke den Cache-Server oder der Cache-Server Gitea nicht erreichen können.
- Verbessert die Verarbeitung von IPv6-URLs, das Herunterfahren des Cache-Servers und die gleichzeitige Aufgabenzulassung.

[Vollständiges Änderungsprotokoll](https://gitea.com/gitea/runner/compare/v3.4.1...v3.5.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.5.0.

**Funkcje**

- Zadania korzystające z gniazda Dockera mogą montować ścieżki zadań bez włączania \`bind_workdir\`.
- Wyrażenia zwracające całą wartość są obsługiwane w strategiach, środowiskach, danych wejściowych, usługach i danych wyjściowych.

**Poprawki i ulepszenia**

- Ulepszono uruchamianie zadań, żądania pamięci podręcznej i czyszczenie dużych przestrzeni roboczych.
- Naprawiono błędy montowania przestrzeni roboczej pnpm i przesyłanie artefaktów, gdy izolowane sieci zadań nie mogą połączyć się z serwerem pamięci podręcznej lub serwer pamięci podręcznej nie może połączyć się z Gitea.
- Ulepszono obsługę adresów URL IPv6, zamykanie serwera pamięci podręcznej i równoczesne przyjmowanie zadań.

[Pełny rejestr zmian](https://gitea.com/gitea/runner/compare/v3.4.1...v3.5.0)`,
    fr_FR: `Gitea Runner mis à jour vers 3.5.0.

**Fonctionnalités**

- Les tâches utilisant le socket Docker peuvent monter les chemins des tâches sans activer \`bind_workdir\`.
- Les expressions portant sur une valeur entière sont prises en charge dans les stratégies, les environnements, les entrées, les services et les sorties.

**Corrections et améliorations**

- Améliore le démarrage des tâches, les requêtes de cache et le nettoyage des grands espaces de travail.
- Corrige les erreurs de montage de l'espace de travail pnpm et le téléversement d'artefacts lorsque les réseaux de tâches isolés ne peuvent pas joindre le serveur de cache ou que celui-ci ne peut pas joindre Gitea.
- Améliore la gestion des URL IPv6, l'arrêt du serveur de cache et l'admission simultanée des tâches.

[Journal des modifications complet](https://gitea.com/gitea/runner/compare/v3.4.1...v3.5.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
