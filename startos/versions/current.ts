import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.2.3:1',
  releaseNotes: {
    en_US:
      'The runner can now take jobs from a Gitea on another server. Choose Remote server under Gitea Instance in Configure and enter its address and a fresh registration token; Gitea on this server is then not needed.',
    es_ES:
      'El ejecutor ahora puede tomar trabajos de un Gitea en otro servidor. Elija Servidor remoto en Instancia de Gitea en Configurar e introduzca su dirección y un token de registro nuevo; entonces no se necesita Gitea en este servidor.',
    de_DE:
      'Der Runner kann jetzt Jobs von einem Gitea auf einem anderen Server übernehmen. Wählen Sie unter Gitea-Instanz in Konfigurieren „Entfernter Server“ und geben Sie dessen Adresse und ein neues Registrierungs-Token ein; Gitea auf diesem Server wird dann nicht benötigt.',
    pl_PL:
      'Runner może teraz pobierać zadania z Gitea na innym serwerze. W akcji Konfiguruj wybierz Serwer zdalny w polu Instancja Gitea i podaj jego adres oraz nowy token rejestracji; Gitea na tym serwerze nie jest wtedy potrzebne.',
    fr_FR:
      'Le runner peut désormais recevoir des tâches d’un Gitea sur un autre serveur. Choisissez Serveur distant sous Instance Gitea dans Configurer et saisissez son adresse et un nouveau jeton d’inscription ; Gitea n’est alors plus nécessaire sur ce serveur.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
