import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.3.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.3.0, which also carries the 3.2.0 release.

- **Behavior change:** the tool cache is no longer shared between jobs. Each job now uses what its image ships and discards what it installs, the same as GitHub Actions. The shared volume was not safe for two jobs to write at once, so it could be corrupted whenever Concurrent Jobs was above 1.
- A failed step no longer breaks artifact uploads for the rest of the job: every later \`actions/upload-artifact\` used to fail with \`GHESNotSupportedError\`.
- Calls to Gitea now time out instead of hanging, so a job no longer goes quiet until Gitea gives up on it.
- Cache entries can be evicted by size, and cache retention counts from last use rather than from creation.
- Workflows can refer to their own repository with GitHub's \`$/\` prefix in \`uses:\`, and \`workflow_dispatch\` inputs appear in the job's "Set up job" section.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.3.0 and https://gitea.com/gitea/runner/releases/tag/v3.2.0`,
    es_ES: `Gitea Runner actualizado a 3.3.0, que incluye también la versión 3.2.0.

- **Cambio de comportamiento:** la caché de herramientas ya no se comparte entre trabajos. Cada trabajo usa ahora lo que trae su imagen y descarta lo que instala, igual que en GitHub Actions. El volumen compartido no era seguro para que dos trabajos escribieran a la vez, así que podía corromperse siempre que Trabajos simultáneos fuera mayor que 1.
- Un paso fallido ya no rompe las subidas de artefactos durante el resto del trabajo: antes, cada \`actions/upload-artifact\` posterior fallaba con \`GHESNotSupportedError\`.
- Las llamadas a Gitea ahora expiran en lugar de quedarse colgadas, así que un trabajo ya no se queda en silencio hasta que Gitea lo da por perdido.
- Las entradas de la caché pueden expulsarse por tamaño, y la retención de la caché se cuenta desde el último uso en lugar de desde la creación.
- Los flujos de trabajo pueden referirse a su propio repositorio con el prefijo \`$/\` de GitHub en \`uses:\`, y las entradas de \`workflow_dispatch\` aparecen en la sección «Set up job» del trabajo.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.3.0 y https://gitea.com/gitea/runner/releases/tag/v3.2.0`,
    de_DE: `Gitea Runner auf 3.3.0 aktualisiert, womit auch die Version 3.2.0 enthalten ist.

- **Verhaltensänderung:** Der Tool-Cache wird nicht mehr zwischen Jobs geteilt. Jeder Job verwendet jetzt das, was sein Image mitbringt, und verwirft, was er installiert — genau wie bei GitHub Actions. Das gemeinsame Volume war nicht sicher, wenn zwei Jobs gleichzeitig hineinschrieben, es konnte also beschädigt werden, sobald „Gleichzeitige Aufträge“ über 1 lag.
- Ein fehlgeschlagener Schritt bricht die Artefakt-Uploads im restlichen Job nicht mehr ab: Bisher schlug jedes spätere \`actions/upload-artifact\` mit \`GHESNotSupportedError\` fehl.
- Aufrufe an Gitea laufen jetzt in einen Timeout, statt hängen zu bleiben, sodass ein Job nicht mehr verstummt, bis Gitea ihn aufgibt.
- Cache-Einträge können nach Größe verdrängt werden, und die Cache-Aufbewahrung zählt ab der letzten Nutzung statt ab der Erstellung.
- Workflows können ihr eigenes Repository mit GitHubs \`$/\`-Präfix in \`uses:\` ansprechen, und \`workflow_dispatch\`-Eingaben erscheinen im Abschnitt „Set up job“ des Jobs.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.3.0 und https://gitea.com/gitea/runner/releases/tag/v3.2.0`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.3.0, co obejmuje także wydanie 3.2.0.

- **Zmiana zachowania:** pamięć podręczna narzędzi nie jest już współdzielona między zadaniami. Każde zadanie korzysta teraz z tego, co zawiera jego obraz, i odrzuca to, co zainstaluje — tak samo jak w GitHub Actions. Wspólny wolumin nie był bezpieczny przy jednoczesnym zapisie z dwóch zadań, więc mógł ulec uszkodzeniu, gdy „Zadania równoległe” ustawiono powyżej 1.
- Nieudany krok nie psuje już przesyłania artefaktów w dalszej części zadania: dotąd każde kolejne \`actions/upload-artifact\` kończyło się błędem \`GHESNotSupportedError\`.
- Wywołania do Gitei mają teraz limit czasu zamiast zawieszać się, więc zadanie nie milknie aż do chwili, gdy Gitea je porzuci.
- Wpisy pamięci podręcznej mogą być usuwane według rozmiaru, a czas przechowywania liczy się od ostatniego użycia zamiast od utworzenia.
- Przepływy pracy mogą wskazywać własne repozytorium przedrostkiem \`$/\` z GitHuba w \`uses:\`, a dane wejściowe \`workflow_dispatch\` pojawiają się w sekcji „Set up job” zadania.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.3.0 oraz https://gitea.com/gitea/runner/releases/tag/v3.2.0`,
    fr_FR: `Gitea Runner mis à jour vers 3.3.0, ce qui inclut également la version 3.2.0.

- **Changement de comportement :** le cache d'outils n'est plus partagé entre les jobs. Chaque job utilise désormais ce que son image fournit et jette ce qu'il installe, comme sur GitHub Actions. Le volume partagé n'était pas sûr lorsque deux jobs y écrivaient en même temps, il pouvait donc être corrompu dès que « Tâches simultanées » dépassait 1.
- Une étape en échec ne casse plus les envois d'artefacts pour le reste du job : jusqu'ici, chaque \`actions/upload-artifact\` suivant échouait avec \`GHESNotSupportedError\`.
- Les appels vers Gitea expirent maintenant au lieu de rester bloqués, si bien qu'un job ne reste plus muet jusqu'à ce que Gitea l'abandonne.
- Les entrées du cache peuvent être évincées selon leur taille, et la rétention du cache se compte à partir de la dernière utilisation plutôt que de la création.
- Les workflows peuvent désigner leur propre dépôt avec le préfixe \`$/\` de GitHub dans \`uses:\`, et les entrées de \`workflow_dispatch\` apparaissent dans la section « Set up job » du job.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.3.0 et https://gitea.com/gitea/runner/releases/tag/v3.2.0`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
