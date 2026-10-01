import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '4.0.1:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 4.0.1. Fixes reusable workflow jobs losing the caller's event and inputs, and applies container settings to the runs-on image when no image is specified. The runner follows Gitea when its internal address changes. If Gitea no longer recognizes the runner, for example after Gitea is reinstalled, the Runner health check asks you to run Configure with a fresh token.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v4.0.1)`,
    es_ES: `Gitea Runner actualizado a 4.0.1. Corrige la pérdida del evento y las entradas del flujo llamador en los trabajos de flujos reutilizables y aplica la configuración del contenedor a la imagen de runs-on cuando no se especifica una imagen. El runner sigue a Gitea cuando cambia su dirección interna. Si Gitea ya no reconoce el runner, por ejemplo tras reinstalar Gitea, la comprobación de estado Runner le pide ejecutar Configurar con un token nuevo.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v4.0.1)`,
    de_DE: `Gitea Runner auf 4.0.1 aktualisiert. Behebt den Verlust des Ereignisses und der Eingaben des aufrufenden Workflows in wiederverwendbaren Workflow-Jobs und wendet Container-Einstellungen auf das runs-on-Image an, wenn kein Image angegeben ist. Der Runner folgt Gitea, wenn sich dessen interne Adresse ändert. Erkennt Gitea den Runner nicht mehr, etwa nach einer Neuinstallation von Gitea, fordert die Integritätsprüfung Runner Sie auf, Konfigurieren mit einem neuen Token auszuführen.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v4.0.1)`,
    pl_PL: `Zaktualizowano Gitea Runner do 4.0.1. Naprawiono utratę zdarzenia i danych wejściowych wywołującego w zadaniach przepływów wielokrotnego użytku oraz stosowanie ustawień kontenera do obrazu runs-on, gdy nie podano obrazu. Runner podąża za Gitea, gdy zmienia się jej adres wewnętrzny. Jeśli Gitea przestanie rozpoznawać runnera, na przykład po ponownej instalacji Gitea, kontrola stanu Runner poprosi o uruchomienie Konfiguruj z nowym tokenem.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v4.0.1)`,
    fr_FR: `Gitea Runner mis à jour vers la version 4.0.1. Corrige la perte de l'événement et des entrées du workflow appelant dans les tâches de workflows réutilisables et applique les paramètres du conteneur à l'image runs-on lorsqu'aucune image n'est spécifiée. Le runner suit Gitea lorsque son adresse interne change. Si Gitea ne reconnaît plus le runner, par exemple après une réinstallation de Gitea, la vérification d'état Runner vous demande d'exécuter Configurer avec un nouveau jeton.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v4.0.1)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
