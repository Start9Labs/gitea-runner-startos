import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.2.4:0',
  releaseNotes: {
    en_US:
      'Updated Gitea Runner to 5.2.4, fixing the v4 artifact API used by upload-artifact v4 and later. The runner can now take jobs from a Gitea on another server: choose Remote server under Gitea Instance in Configure and enter its address and a fresh registration token. Gitea on this server is then not needed. Full upstream notes: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    es_ES:
      'Gitea Runner actualizado a 5.2.4, corrigiendo la API de artefactos v4 utilizada por upload-artifact v4 y posteriores. El ejecutor ahora puede tomar trabajos de un Gitea en otro servidor: elija Servidor remoto en Instancia de Gitea en Configurar e introduzca su dirección y un token de registro nuevo. Entonces no se necesita Gitea en este servidor. Notas completas: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    de_DE:
      'Gitea Runner auf 5.2.4 aktualisiert; behebt die von upload-artifact v4 und neuer verwendete Artefakt-API v4. Der Runner kann jetzt Jobs von einem Gitea auf einem anderen Server übernehmen: Wählen Sie unter Gitea-Instanz in Konfigurieren „Entfernter Server“ und geben Sie dessen Adresse und ein neues Registrierungs-Token ein. Gitea auf diesem Server wird dann nicht benötigt. Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    pl_PL:
      'Zaktualizowano Gitea Runner do 5.2.4, naprawiając API artefaktów v4 używane przez upload-artifact v4 i nowsze. Runner może teraz pobierać zadania z Gitea na innym serwerze: w akcji Konfiguruj wybierz Serwer zdalny w polu Instancja Gitea i podaj jego adres oraz nowy token rejestracji. Gitea na tym serwerze nie jest wtedy potrzebne. Pełne informacje: https://gitea.com/gitea/runner/releases/tag/v5.2.4',
    fr_FR:
      'Gitea Runner mis à jour vers la version 5.2.4, corrigeant l’API d’artefacts v4 utilisée par upload-artifact v4 et les versions ultérieures. Le runner peut désormais recevoir des tâches d’un Gitea sur un autre serveur : choisissez Serveur distant sous Instance Gitea dans Configurer et saisissez son adresse et un nouveau jeton d’inscription. Gitea n’est alors plus nécessaire sur ce serveur. Notes complètes : https://gitea.com/gitea/runner/releases/tag/v5.2.4',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
