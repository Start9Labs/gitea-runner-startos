import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.3.0:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 5.3.0.

- Adds GITEA_* aliases for built-in GITHUB_* workflow environment variables and fixes action repository/ref values leaking between steps.
- Upstream now scopes workflow caches by ref; existing caches start cold after upgrading. This package continues to disable the cache service.
- Fixes the v4 artifact API used by upload-artifact v4 and later, Docker proxy probe container leaks, and a local reusable-workflow CLI panic. Includes a networking dependency security update for CVE-2026-78661.
- The runner can now take jobs from a Gitea on another server: choose Remote server under Gitea Instance in Configure and enter its address and a fresh registration token. Gitea on this server is then not needed.

[5.3.0 release notes](https://gitea.com/gitea/runner/releases/tag/v5.3.0) · [5.2.4 release notes](https://gitea.com/gitea/runner/releases/tag/v5.2.4)`,
    es_ES: `Gitea Runner actualizado a 5.3.0.

- Añade alias GITEA_* para las variables de entorno GITHUB_* integradas de los flujos y corrige la filtración de los valores de repositorio y referencia de acciones entre pasos.
- Upstream ahora limita las cachés de los flujos por referencia; las cachés existentes deben regenerarse tras actualizar. Este paquete mantiene desactivado el servicio de caché.
- Corrige la API de artefactos v4 utilizada por upload-artifact v4 y posteriores, las fugas de contenedores de la comprobación del proxy Docker y un fallo de la CLI con flujos reutilizables locales. Incluye una actualización de seguridad de una dependencia de red para CVE-2026-78661.
- El ejecutor ahora puede tomar trabajos de un Gitea en otro servidor: elija Servidor remoto en Instancia de Gitea en Configurar e introduzca su dirección y un token de registro nuevo. Entonces no se necesita Gitea en este servidor.

[Notas de la versión 5.3.0](https://gitea.com/gitea/runner/releases/tag/v5.3.0) · [Notas de la versión 5.2.4](https://gitea.com/gitea/runner/releases/tag/v5.2.4)`,
    de_DE: `Gitea Runner auf 5.3.0 aktualisiert.

- Ergänzt GITEA_*-Aliase für integrierte GITHUB_*-Umgebungsvariablen in Workflows und behebt das Übertragen von Action-Repository und -Ref auf andere Schritte.
- Upstream trennt Workflow-Caches nun nach Ref; bestehende Caches müssen nach dem Upgrade neu aufgebaut werden. Dieses Paket deaktiviert den Cache-Dienst weiterhin.
- Behebt die von upload-artifact v4 und neuer verwendete Artefakt-API v4, zurückgelassene Container bei Docker-Proxy-Prüfungen und einen CLI-Absturz bei lokalen wiederverwendbaren Workflows. Enthält ein Sicherheitsupdate einer Netzwerkabhängigkeit für CVE-2026-78661.
- Der Runner kann jetzt Jobs von einem Gitea auf einem anderen Server übernehmen: Wählen Sie unter Gitea-Instanz in Konfigurieren „Entfernter Server“ und geben Sie dessen Adresse und ein neues Registrierungs-Token ein. Gitea auf diesem Server wird dann nicht benötigt.

[Versionshinweise zu 5.3.0](https://gitea.com/gitea/runner/releases/tag/v5.3.0) · [Versionshinweise zu 5.2.4](https://gitea.com/gitea/runner/releases/tag/v5.2.4)`,
    pl_PL: `Zaktualizowano Gitea Runner do 5.3.0.

- Dodaje aliasy GITEA_* dla wbudowanych zmiennych środowiskowych GITHUB_* przepływów i naprawia przenikanie wartości repozytorium i referencji akcji między krokami.
- Upstream ogranicza teraz pamięć podręczną przepływów do referencji; istniejąca pamięć podręczna musi zostać odbudowana po aktualizacji. Ten pakiet nadal wyłącza usługę pamięci podręcznej.
- Naprawia API artefaktów v4 używane przez upload-artifact v4 i nowsze, pozostawianie kontenerów przez sondę proxy Dockera oraz awarię CLI przy lokalnych przepływach wielokrotnego użytku. Zawiera aktualizację bezpieczeństwa zależności sieciowej dla CVE-2026-78661.
- Runner może teraz pobierać zadania z Gitea na innym serwerze: w akcji Konfiguruj wybierz Serwer zdalny w polu Instancja Gitea i podaj jego adres oraz nowy token rejestracji. Gitea na tym serwerze nie jest wtedy potrzebne.

[Informacje o wydaniu 5.3.0](https://gitea.com/gitea/runner/releases/tag/v5.3.0) · [Informacje o wydaniu 5.2.4](https://gitea.com/gitea/runner/releases/tag/v5.2.4)`,
    fr_FR: `Gitea Runner mis à jour vers la version 5.3.0.

- Ajoute des alias GITEA_* pour les variables d’environnement GITHUB_* intégrées des workflows et corrige la propagation du dépôt et de la référence d’une action entre les étapes.
- Le projet amont limite désormais les caches des workflows par référence ; les caches existants doivent être reconstruits après la mise à niveau. Ce paquet continue de désactiver le service de cache.
- Corrige l’API d’artefacts v4 utilisée par upload-artifact v4 et les versions ultérieures, les conteneurs abandonnés par la sonde du proxy Docker et un plantage de la CLI avec les workflows réutilisables locaux. Inclut une mise à jour de sécurité d’une dépendance réseau pour CVE-2026-78661.
- Le runner peut désormais recevoir des tâches d’un Gitea sur un autre serveur : choisissez Serveur distant sous Instance Gitea dans Configurer et saisissez son adresse et un nouveau jeton d’inscription. Gitea n’est alors plus nécessaire sur ce serveur.

[Notes de version 5.3.0](https://gitea.com/gitea/runner/releases/tag/v5.3.0) · [Notes de version 5.2.4](https://gitea.com/gitea/runner/releases/tag/v5.2.4)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
