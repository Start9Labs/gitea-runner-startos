import { FileHelper, VersionInfo, IMPOSSIBLE, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { DATA_DIR, virtualizationAvailable } from '../utils'

export const current = VersionInfo.of({
  version: '5.1.0:1',
  releaseNotes: {
    en_US: `**Execution and isolation**

- With accessible KVM, new installations default to disposable, assignment-only VMs; no guests run while idle. Container mode remains available, shares the StartOS kernel and should run trusted workflows only. VM failures do not fall back to containers. A saved VM choice blocks startup with a critical Configure task if KVM becomes unavailable; restore KVM access or explicitly save container mode.
- VMs share half the service-visible RAM, with acknowledged memory reclaim. Guest disks remain bounded to 8–32 GiB each. Reusable-workflow jobs and matrices run sequentially within each assignment; separate assignments can overlap.
- Optional emulation adds a label for the other CPU architecture. Only Docker labels are accepted; replace any host-execution labels through Configure.
- Public StartOS certificate trust and local Gitea hostname routing reach jobs. Action-source access is confined, caches are private per assignment and VM Docker access uses per-guest mTLS.

**Registration and upgrade**

- Runtime-only Configure edits preserve registration; leave the token blank. A fresh token explicitly creates or replaces registration, preserving the old identity until replacement succeeds. Restored registrations do not need a saved token.
- The upgrade discards old Podman image layers and transient runtime state, but keeps registration, settings and unrelated files. Execution scratch is not backed up. Jobs repull images in fresh VMs.
- Idle slots report success; assigned slots report loading without blocking daemon readiness. Preparation and registration failures remain visible.
- Builds use patched Go TLS verification and start-sdk 3.1.0.`,
    es_ES: `**Ejecución y aislamiento**

- Con KVM accesible, las instalaciones nuevas usan por defecto máquinas virtuales desechables, creadas solo para tareas asignadas; no hay máquinas en reposo. El modo contenedor sigue disponible, comparte el núcleo de StartOS y debe ejecutar solo flujos de confianza. Los fallos de una máquina virtual no cambian al modo contenedor. Si KVM deja de estar disponible con VM activada, una tarea crítica Configurar bloquea el inicio; restablezca KVM o guarde explícitamente el modo contenedor.
- Las máquinas comparten la mitad de la RAM visible para el servicio, con recuperación de memoria confirmada. Cada disco sigue limitado a 8–32 GiB. Los trabajos y matrices de flujos reutilizables se ejecutan secuencialmente dentro de cada asignación; distintas asignaciones pueden coincidir.
- La emulación opcional añade una etiqueta para la otra arquitectura. Solo se aceptan etiquetas Docker; sustituya las etiquetas de ejecución en el host mediante Configurar.
- Los trabajos reciben la confianza en el certificado público de StartOS y el acceso al nombre local de Gitea. Se limita el acceso a los archivos de acciones, cada asignación tiene su caché privada y el acceso Docker de cada máquina usa mTLS propio.

**Registro y actualización**

- Los cambios de ejecución en Configurar conservan el registro; deje el token vacío. Un token nuevo crea o sustituye el registro, conservando la identidad anterior hasta que la sustitución termine. Los registros restaurados no necesitan un token guardado.
- La actualización descarta las capas de imágenes de Podman y su estado temporal, pero conserva el registro, los ajustes y los archivos ajenos. El espacio de ejecución no se respalda. Las máquinas nuevas descargan de nuevo las imágenes.
- Los puestos inactivos indican éxito y los asignados indican carga sin bloquear la disponibilidad del proceso. Los fallos de preparación y registro siguen visibles.
- Las compilaciones usan la verificación TLS corregida de Go y start-sdk 3.1.0.`,
    de_DE: `**Ausführung und Isolation**

- Bei zugänglichem KVM verwenden Neuinstallationen standardmäßig kurzlebige VMs nur für zugewiesene Aufträge; im Leerlauf laufen keine Gäste. Der Containermodus bleibt verfügbar, teilt den StartOS-Kernel und ist nur für vertrauenswürdige Workflows geeignet. VM-Fehler wechseln nicht zum Containermodus. Bei gespeicherter VM-Auswahl blockiert fehlendes KVM den Start mit einer kritischen Aufgabe; KVM wiederherstellen oder den Containermodus ausdrücklich speichern.
- Die VMs teilen die Hälfte des für den Dienst sichtbaren RAMs mit bestätigter Speicherrückgabe. Gastplatten bleiben auf jeweils 8–32 GiB begrenzt. Jobs und Matrizen wiederverwendbarer Workflows laufen innerhalb einer Zuweisung nacheinander; getrennte Zuweisungen können parallel laufen.
- Optionale Emulation ergänzt ein Label für die andere CPU-Architektur. Nur Docker-Labels sind zulässig; Host-Ausführungslabels müssen über Konfigurieren ersetzt werden.
- Jobs erhalten das öffentliche StartOS-Vertrauenszertifikat und die lokale Gitea-Namensauflösung. Der Zugriff auf Action-Quelldateien ist begrenzt, Caches sind pro Zuweisung privat und Docker-Zugriffe der VMs verwenden eigenes mTLS.

**Registrierung und Upgrade**

- Änderungen der Ausführung unter Konfigurieren erhalten die Registrierung; das Tokenfeld bleibt leer. Ein neues Token erstellt oder ersetzt die Registrierung und erhält die alte Identität bis zum erfolgreichen Austausch. Wiederhergestellte Registrierungen benötigen kein gespeichertes Token.
- Das Upgrade entfernt alte Podman-Imageschichten und Laufzeitdaten, erhält aber Registrierung, Einstellungen und andere Dateien. Ausführungsspeicher ist nicht Teil der Sicherung. Neue VMs laden Job-Images erneut.
- Leere Slots melden Erfolg, zugewiesene Slots einen laufenden Vorgang, ohne die Prozessbereitschaft zu blockieren. Vorbereitungs- und Registrierungsfehler bleiben sichtbar.
- Builds verwenden die korrigierte Go-TLS-Prüfung und start-sdk 3.1.0.`,
    pl_PL: `**Wykonywanie i izolacja**

- Przy dostępnym KVM nowe instalacje domyślnie używają jednorazowych maszyn wirtualnych tworzonych tylko dla przydzielonych zadań; bez zadań nie działają żadne maszyny. Tryb kontenerowy pozostaje dostępny, współdzieli jądro StartOS i powinien obsługiwać tylko zaufane przepływy. Awaria maszyny nie przełącza zadania na kontener. Jeśli przy zapisanym trybie VM zabraknie KVM, krytyczne zadanie Konfiguruj blokuje start; przywróć KVM lub jawnie zapisz tryb kontenerowy.
- Maszyny współdzielą połowę pamięci RAM widocznej dla usługi, z potwierdzanym zwalnianiem pamięci. Dysk każdej maszyny pozostaje ograniczony do 8–32 GiB. Zadania i macierze przepływów wielokrotnego użytku działają kolejno w ramach jednego przydziału; osobne przydziały mogą działać równolegle.
- Opcjonalna emulacja dodaje etykietę drugiej architektury CPU. Dozwolone są tylko etykiety Docker; etykiety uruchamiania na hoście należy zastąpić przez Konfiguruj.
- Zadania otrzymują zaufanie do publicznego certyfikatu StartOS i dostęp do lokalnej nazwy Gitei. Dostęp do źródeł akcji jest ograniczony, pamięć podręczna jest prywatna dla każdego przydziału, a połączenie Docker każdej maszyny używa osobnego mTLS.

**Rejestracja i aktualizacja**

- Zmiany wykonania przez Konfiguruj zachowują rejestrację; pozostaw pole tokena puste. Nowy token tworzy lub zastępuje rejestrację, zachowując starą tożsamość do udanego zastąpienia. Przywrócone rejestracje nie wymagają zapisanego tokena.
- Aktualizacja usuwa stare warstwy obrazów Podmana i stan tymczasowy, zachowując rejestrację, ustawienia i pozostałe pliki. Przestrzeń wykonawcza nie jest objęta kopią zapasową. Nowe maszyny ponownie pobierają obrazy.
- Bezczynne stanowiska wskazują powodzenie, a przydzielone wskazują trwającą pracę bez blokowania gotowości procesu. Błędy przygotowania i rejestracji pozostają widoczne.
- Kompilacje korzystają z poprawionej weryfikacji TLS w Go i start-sdk 3.1.0.`,
    fr_FR: `**Exécution et isolation**

- Si KVM est accessible, les nouvelles installations utilisent par défaut des machines virtuelles jetables créées uniquement pour les tâches attribuées ; aucun invité ne tourne au repos. Le mode conteneur reste disponible, partage le noyau de StartOS et doit exécuter uniquement des workflows de confiance. Un échec de VM ne déclenche pas de repli vers les conteneurs. Si KVM devient indisponible alors que le mode VM est enregistré, une tâche critique Configurer bloque le démarrage ; rétablissez KVM ou enregistrez explicitement le mode conteneur.
- Les VM partagent la moitié de la RAM visible par le service, avec récupération de mémoire confirmée. Chaque disque reste limité à 8–32 Gio. Les jobs et matrices des workflows réutilisables s’exécutent séquentiellement dans chaque attribution ; des attributions distinctes peuvent se chevaucher.
- L’émulation facultative ajoute une étiquette pour l’autre architecture CPU. Seules les étiquettes Docker sont acceptées ; remplacez les étiquettes d’exécution sur l’hôte via Configurer.
- Les jobs reçoivent la confiance envers le certificat public de StartOS et le routage du nom local de Gitea. L’accès aux sources des actions est limité, les caches sont privés par attribution et l’accès Docker de chaque VM utilise son propre mTLS.

**Inscription et mise à niveau**

- Les changements d’exécution via Configurer conservent l’inscription ; laissez le jeton vide. Un nouveau jeton crée ou remplace l’inscription en préservant l’ancienne identité jusqu’à la réussite. Une inscription restaurée ne nécessite pas de jeton enregistré.
- La mise à niveau supprime les anciennes couches Podman et leur état temporaire, mais conserve l’inscription, les paramètres et les autres fichiers. L’espace d’exécution n’est pas sauvegardé. Les nouvelles VM téléchargent à nouveau les images.
- Les emplacements inactifs indiquent une réussite, les emplacements attribués une opération en cours sans bloquer la disponibilité du processus. Les échecs de préparation et d’inscription restent visibles.
- Les compilations utilisent la vérification TLS corrigée de Go et start-sdk 3.1.0.`,
  },
  migrations: {
    up: async ({ effects }) => {
      const previous = await FileHelper.json(
        { base: sdk.volumes.main, subpath: './store.json' },
        z.looseObject({
          virtualization: z.boolean().optional().catch(undefined),
        }),
      )
        .read()
        .once()
      await storeJson.merge(effects, {
        virtualization:
          previous?.virtualization ?? (await virtualizationAvailable(effects)),
      })
      await sdk.SubContainer.withTemp(
        effects,
        { imageId: 'main' },
        sdk.Mounts.of().mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: DATA_DIR,
          readonly: false,
        }),
        'migrate-podman-storage',
        (subcontainer) =>
          subcontainer.execFail(
            [
              'sh',
              '-ec',
              `if [ -d ${DATA_DIR}/runner ] && [ ! -L ${DATA_DIR}/runner ]; then
  rm -rf -- ${DATA_DIR}/runner/run
  if [ -d ${DATA_DIR}/runner/containers ] && [ ! -L ${DATA_DIR}/runner/containers ]; then
    rm -rf -- ${DATA_DIR}/runner/containers/storage
  fi
fi`,
            ],
            { user: 'root', timeout: null },
          ),
      )
    },
    down: IMPOSSIBLE,
  },
})
