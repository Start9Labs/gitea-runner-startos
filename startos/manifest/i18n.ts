export const short = {
  en_US: 'A CI/CD runner for Gitea Actions',
  es_ES: 'Un ejecutor CI/CD para Gitea Actions',
  de_DE: 'Ein CI/CD-Runner für Gitea Actions',
  pl_PL: 'Runner CI/CD dla Gitea Actions',
  fr_FR: 'Un exécuteur CI/CD pour Gitea Actions',
}

export const long = {
  en_US:
    'Gitea Runner executes Actions workflows for Gitea on this device or on another server. With accessible KVM, assignments use disposable VMs sharing a bounded guest-memory pool; no guests run while idle. Optional container mode shares the StartOS kernel and should run trusted workflows only. Supports configurable concurrency and emulated jobs for the other CPU architecture. Gitea Runner is published under the MIT license.',
  es_ES:
    'Gitea Runner ejecuta flujos de Actions para Gitea en este dispositivo o en otro servidor. Con KVM accesible, las tareas usan máquinas virtuales desechables con un fondo de memoria limitado; no hay máquinas en reposo. El modo contenedor opcional comparte el núcleo de StartOS y debe ejecutar solo flujos de confianza. Admite concurrencia configurable y emulación de la otra arquitectura CPU. Gitea Runner se publica bajo la licencia MIT.',
  de_DE:
    'Gitea Runner führt Actions-Workflows für Gitea auf diesem Gerät oder auf einem anderen Server aus. Bei zugänglichem KVM nutzen Aufträge kurzlebige VMs mit begrenztem gemeinsamen Gastspeicher; im Leerlauf laufen keine Gäste. Der optionale Containermodus teilt den StartOS-Kernel und eignet sich nur für vertrauenswürdige Workflows. Unterstützt einstellbare Parallelität und Emulation der anderen CPU-Architektur. Gitea Runner steht unter der MIT-Lizenz.',
  pl_PL:
    'Gitea Runner wykonuje przepływy Actions dla Gitei na tym urządzeniu lub na innym serwerze. Przy dostępnym KVM zadania używają jednorazowych maszyn ze wspólną, ograniczoną pulą RAM; bez zadań nie działają żadne maszyny. Opcjonalny tryb kontenerowy współdzieli jądro StartOS i jest przeznaczony tylko dla zaufanych przepływów. Obsługuje konfigurowaną równoległość i emulację drugiej architektury CPU. Gitea Runner jest dostępny na licencji MIT.',
  fr_FR:
    'Gitea Runner exécute les workflows Actions pour Gitea sur cet appareil ou sur un autre serveur. Si KVM est accessible, les tâches utilisent des VM jetables partageant une réserve de mémoire bornée ; aucun invité ne tourne au repos. Le mode conteneur facultatif partage le noyau de StartOS et convient uniquement aux workflows de confiance. Prend en charge la concurrence configurable et l’émulation de l’autre architecture CPU. Gitea Runner est publié sous licence MIT.',
}

export const dependencyDescription = {
  en_US:
    'The Gitea on this device that this runner serves. Not needed when the runner is connected to a Gitea on another server.',
  es_ES:
    'El Gitea de este dispositivo al que sirve este ejecutor. No es necesario si el ejecutor está conectado a un Gitea en otro servidor.',
  de_DE:
    'Das Gitea auf diesem Gerät, das dieser Runner bedient. Nicht nötig, wenn der Runner mit einem Gitea auf einem anderen Server verbunden ist.',
  pl_PL:
    'Gitea na tym urządzeniu, które obsługuje ten runner. Niepotrzebne, gdy runner jest połączony z Gitea na innym serwerze.',
  fr_FR:
    'Le Gitea de cet appareil que ce runner dessert. Inutile lorsque le runner est connecté à un Gitea sur un autre serveur.',
}
