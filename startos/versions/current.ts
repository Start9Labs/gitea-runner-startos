import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.1.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.1.0.

- Retries startup while Gitea is unreachable instead of exiting.
- Shows action pre/post steps separately on Gitea versions that support it, and preserves their environment files after timeouts or cancellation.
- Fixes action copies on rootless Podman with images that symlink /var/run, and PATH handling in cross-architecture jobs.
- Ignores workflow container --entrypoint options with a warning instead of breaking the container.
- Includes security updates to Go and networking dependencies. Updated start-sdk to 3.0.6.
- An unconfigured runner now raises a critical Configure task. Save a registration token before starting; existing registrations need no setup task.

[Full upstream release notes](https://gitea.com/gitea/runner/releases/tag/v5.1.0)`,
    es_ES: `Gitea Runner actualizado a 5.1.0.

- Reintenta el inicio cuando Gitea no está disponible en lugar de finalizar.
- Muestra los pasos pre/post de las acciones por separado en las versiones de Gitea compatibles y conserva sus archivos de entorno tras un tiempo de espera agotado o una cancelación.
- Corrige la copia de acciones en Podman sin privilegios con imágenes que usan un enlace simbólico para /var/run y la gestión de PATH en trabajos de otra arquitectura.
- Ignora las opciones --entrypoint de los contenedores del flujo con una advertencia en lugar de romper el contenedor.
- Incluye actualizaciones de seguridad de Go y las dependencias de red. start-sdk actualizado a 3.0.6.
- Un ejecutor sin configurar crea una tarea crítica Configurar. Guarde un token de registro antes de iniciar; los registros existentes no necesitan esta tarea.

[Notas completas de la versión](https://gitea.com/gitea/runner/releases/tag/v5.1.0)`,
    de_DE: `Gitea Runner auf 5.1.0 aktualisiert.

- Wiederholt den Start bei nicht erreichbarem Gitea, statt sich zu beenden.
- Zeigt Pre-/Post-Schritte von Actions in unterstützten Gitea-Versionen separat an und behält deren Umgebungsdateien nach Zeitüberschreitungen oder Abbrüchen.
- Behebt das Kopieren von Actions unter rootless Podman bei Images mit einem Symlink für /var/run sowie die PATH-Verarbeitung bei Jobs für andere Architekturen.
- Ignoriert --entrypoint-Optionen in Workflow-Containern mit einer Warnung, statt den Container unbrauchbar zu machen.
- Enthält Sicherheitsupdates für Go und Netzwerkabhängigkeiten. start-sdk auf 3.0.6 aktualisiert.
- Ein unkonfigurierter Runner erstellt eine kritische Aufgabe „Konfigurieren“. Speichern Sie vor dem Start ein Registrierungs-Token; bestehende Registrierungen benötigen keine Einrichtungsaufgabe.

[Vollständige Versionshinweise](https://gitea.com/gitea/runner/releases/tag/v5.1.0)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.1.0.

- Ponawia uruchamianie, gdy Gitea jest nieosiągalna, zamiast kończyć działanie.
- Pokazuje kroki pre/post akcji osobno w obsługujących to wersjach Gitei i zachowuje ich pliki środowiska po przekroczeniu limitu czasu lub anulowaniu.
- Naprawia kopiowanie akcji w Podmanie bez uprawnień z obrazami używającymi dowiązania symbolicznego dla /var/run oraz obsługę PATH w zadaniach dla innych architektur.
- Ignoruje opcje --entrypoint kontenerów przepływu z ostrzeżeniem zamiast psuć kontener.
- Zawiera aktualizacje bezpieczeństwa Go i zależności sieciowych. Zaktualizowano start-sdk do 3.0.6.
- Nieskonfigurowany runner tworzy krytyczne zadanie Konfiguruj. Zapisz token rejestracji przed uruchomieniem; istniejące rejestracje nie wymagają tego zadania.

[Pełne informacje o wydaniu](https://gitea.com/gitea/runner/releases/tag/v5.1.0)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.1.0.

- Réessaie le démarrage lorsque Gitea est inaccessible au lieu de quitter.
- Affiche séparément les étapes pre/post des actions sur les versions compatibles de Gitea et conserve leurs fichiers d'environnement après une expiration ou une annulation.
- Corrige la copie des actions avec Podman sans privilèges et les images utilisant un lien symbolique pour /var/run, ainsi que la gestion de PATH dans les tâches pour une autre architecture.
- Ignore les options --entrypoint des conteneurs de workflow avec un avertissement au lieu de casser le conteneur.
- Inclut des mises à jour de sécurité de Go et des dépendances réseau. start-sdk mis à jour vers 3.0.6.
- Un runner non configuré crée une tâche critique Configurer. Enregistrez un jeton avant de démarrer ; les enregistrements existants ne nécessitent pas cette tâche.

[Notes de version complètes](https://gitea.com/gitea/runner/releases/tag/v5.1.0)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
