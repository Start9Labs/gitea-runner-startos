import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.4.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.4.0.

- Adds \`GITEA_DOCKER_WORKSPACE\` for Compose bind mounts and removes the need to add \`bind_workdir\` workspace mounts to \`valid_volumes\`.
- Makes cold action downloads 5–20 times faster and avoids network requests for cached actions.
- Cleans up containers, networks, and volumes after jobs, and correctly fails steps or jobs when expression interpolation fails.
- Updates \`golang.org/x/crypto\` to address CVE-2026-78662 and CVE-2026-56855.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.4.0`,
    es_ES: `Gitea Runner actualizado a 3.4.0.

- Añade \`GITEA_DOCKER_WORKSPACE\` para los montajes de Compose y elimina la necesidad de añadir los montajes de espacio de trabajo de \`bind_workdir\` a \`valid_volumes\`.
- Acelera entre 5 y 20 veces las descargas de acciones sin caché y evita solicitudes de red para las acciones almacenadas en caché.
- Limpia los contenedores, redes y volúmenes después de los trabajos, y marca correctamente como fallidos los pasos o trabajos cuando falla la interpolación de expresiones.
- Actualiza \`golang.org/x/crypto\` para corregir CVE-2026-78662 y CVE-2026-56855.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.4.0`,
    de_DE: `Gitea Runner auf 3.4.0 aktualisiert.

- Fügt \`GITEA_DOCKER_WORKSPACE\` für Compose-Bind-Mounts hinzu und macht es unnötig, \`bind_workdir\`-Arbeitsbereichsmounts in \`valid_volumes\` aufzunehmen.
- Beschleunigt nicht zwischengespeicherte Action-Downloads um das 5- bis 20-Fache und vermeidet Netzwerkanfragen für zwischengespeicherte Actions.
- Bereinigt Container, Netzwerke und Volumes nach Jobs und lässt Schritte oder Jobs bei fehlgeschlagener Ausdrucksinterpolation korrekt fehlschlagen.
- Aktualisiert \`golang.org/x/crypto\`, um CVE-2026-78662 und CVE-2026-56855 zu beheben.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.4.0`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.4.0.

- Dodano \`GITEA_DOCKER_WORKSPACE\` dla montowań Compose i usunięto konieczność dodawania montowań obszaru roboczego \`bind_workdir\` do \`valid_volumes\`.
- Pobieranie niebuforowanych akcji jest od 5 do 20 razy szybsze, a buforowane akcje nie wymagają żądań sieciowych.
- Kontenery, sieci i woluminy są czyszczone po zadaniach, a błędy interpolacji wyrażeń prawidłowo powodują niepowodzenie kroku lub zadania.
- Zaktualizowano \`golang.org/x/crypto\`, aby naprawić CVE-2026-78662 i CVE-2026-56855.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.4.0`,
    fr_FR: `Gitea Runner mis à jour vers 3.4.0.

- Ajoute \`GITEA_DOCKER_WORKSPACE\` pour les montages liés de Compose et évite d'ajouter les montages d'espace de travail \`bind_workdir\` à \`valid_volumes\`.
- Accélère de 5 à 20 fois le téléchargement des actions non mises en cache et évite les requêtes réseau pour les actions mises en cache.
- Nettoie les conteneurs, réseaux et volumes après les jobs, et fait correctement échouer les étapes ou les jobs en cas d'échec de l'interpolation d'une expression.
- Met à jour \`golang.org/x/crypto\` pour corriger CVE-2026-78662 et CVE-2026-56855.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.4.0`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
