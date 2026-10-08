import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '4.1.0:1',
  releaseNotes: {
    en_US:
      '- The Concurrent Jobs field in Configure explains what raising it costs.',
    es_ES:
      '- El campo Trabajos simultáneos de Configurar explica lo que cuesta aumentarlo.',
    de_DE:
      '- Das Feld „Gleichzeitige Aufträge“ in „Konfigurieren“ erklärt, was eine Erhöhung kostet.',
    pl_PL:
      '- Pole „Zadania równoległe” w akcji Konfiguruj wyjaśnia, ile kosztuje jego zwiększenie.',
    fr_FR:
      '- Le champ Tâches simultanées de Configurer explique ce que coûte son augmentation.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
