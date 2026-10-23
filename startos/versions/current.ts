import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.2.2:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.2.2, including the 5.2.1 fixes.

- Masks secrets correctly even when a previous step stopped workflow commands, and removes handled workflow commands and duplicate post-step commands from job logs.
- Fixes cache v2 support for code-split actions such as rust-cache, setup-java and setup-deno.
- Speeds up job setup, action preparation and cache lookups while preserving existing caches.
- Retries Kubernetes startup commands until the kubelet accepts them.

[5.2.2 release notes](https://gitea.com/gitea/runner/releases/tag/v5.2.2) · [5.2.1 release notes](https://gitea.com/gitea/runner/releases/tag/v5.2.1)`,
    es_ES: `Gitea Runner actualizado a 5.2.2, incluidas las correcciones de 5.2.1.

- Enmascara correctamente los secretos aunque un paso anterior haya detenido los comandos del flujo y elimina de los registros los comandos ya procesados y los comandos duplicados de los pasos posteriores.
- Corrige la compatibilidad con caché v2 para acciones con código dividido, como rust-cache, setup-java y setup-deno.
- Acelera la preparación de trabajos y acciones y las búsquedas de caché, conservando las cachés existentes.
- Reintenta los comandos de inicio de Kubernetes hasta que kubelet los acepta.

[Notas de la versión 5.2.2](https://gitea.com/gitea/runner/releases/tag/v5.2.2) · [Notas de la versión 5.2.1](https://gitea.com/gitea/runner/releases/tag/v5.2.1)`,
    de_DE: `Gitea Runner auf 5.2.2 aktualisiert, einschließlich der Fehlerbehebungen aus 5.2.1.

- Maskiert Secrets auch dann korrekt, wenn ein vorheriger Schritt Workflow-Befehle angehalten hat, und entfernt verarbeitete Workflow-Befehle sowie doppelte Post-Schritt-Befehle aus Job-Protokollen.
- Behebt die Cache-v2-Unterstützung für Actions mit aufgeteiltem Code wie rust-cache, setup-java und setup-deno.
- Beschleunigt die Vorbereitung von Jobs und Actions sowie Cache-Abfragen und erhält bestehende Caches.
- Wiederholt Kubernetes-Startbefehle, bis das Kubelet sie annimmt.

[Versionshinweise zu 5.2.2](https://gitea.com/gitea/runner/releases/tag/v5.2.2) · [Versionshinweise zu 5.2.1](https://gitea.com/gitea/runner/releases/tag/v5.2.1)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.2.2, wraz z poprawkami z 5.2.1.

- Poprawnie maskuje sekrety, nawet gdy poprzedni krok zatrzymał polecenia przepływu, i usuwa z dzienników obsłużone polecenia przepływu oraz powielone polecenia kroków końcowych.
- Naprawia obsługę pamięci podręcznej v2 dla akcji z podzielonym kodem, takich jak rust-cache, setup-java i setup-deno.
- Przyspiesza przygotowanie zadań i akcji oraz wyszukiwanie w pamięci podręcznej, zachowując istniejące dane pamięci podręcznej.
- Ponawia polecenia uruchamiania Kubernetes, aż kubelet je zaakceptuje.

[Informacje o wydaniu 5.2.2](https://gitea.com/gitea/runner/releases/tag/v5.2.2) · [Informacje o wydaniu 5.2.1](https://gitea.com/gitea/runner/releases/tag/v5.2.1)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.2.2, avec les corrections de 5.2.1.

- Masque correctement les secrets même si une étape précédente a suspendu les commandes du workflow et retire des journaux les commandes déjà traitées ainsi que les commandes de post-étape en double.
- Corrige la prise en charge du cache v2 pour les actions au code fractionné comme rust-cache, setup-java et setup-deno.
- Accélère la préparation des tâches et des actions ainsi que les recherches dans le cache, tout en conservant les caches existants.
- Réessaie les commandes de démarrage Kubernetes jusqu'à leur acceptation par le kubelet.

[Notes de version 5.2.2](https://gitea.com/gitea/runner/releases/tag/v5.2.2) · [Notes de version 5.2.1](https://gitea.com/gitea/runner/releases/tag/v5.2.1)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
