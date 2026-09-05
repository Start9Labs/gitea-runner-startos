import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.3.2:0',
  releaseNotes: {
    en_US: `Updated Gitea Runner to 3.3.2.

- Workflows can no longer set \`NODE_OPTIONS\` through \`$GITHUB_ENV\` or \`::set-env::\`, matching GitHub.
- Encoded forms of secrets, including Base64 values, are now masked in job output.
- Jobs and steps now report accurate results for \`continue-on-error\`, cancellations, and failing \`if:\` expressions.
- Composite actions now resolve \`matrix\` and \`strategy\` values correctly, keep their inputs isolated from nested actions, and prevent container environment values from overriding job changes.
- Node actions that depend on symlink-aware entry points now run correctly.

Full upstream release notes: https://gitea.com/gitea/runner/releases/tag/v3.3.2`,
    es_ES: `Gitea Runner actualizado a 3.3.2.

- Los flujos de trabajo ya no pueden establecer \`NODE_OPTIONS\` mediante \`$GITHUB_ENV\` ni \`::set-env::\`, igual que en GitHub.
- Las formas codificadas de los secretos, incluidos los valores Base64, ahora se enmascaran en la salida de los trabajos.
- Los trabajos y pasos ahora informan de resultados precisos para \`continue-on-error\`, las cancelaciones y las expresiones \`if:\` fallidas.
- Las acciones compuestas ahora resuelven correctamente los valores \`matrix\` y \`strategy\`, mantienen sus entradas aisladas de las acciones anidadas e impiden que los valores del entorno del contenedor sobrescriban los cambios del trabajo.
- Las acciones de Node que dependen de puntos de entrada compatibles con enlaces simbólicos ahora se ejecutan correctamente.

Notas de la versión completas: https://gitea.com/gitea/runner/releases/tag/v3.3.2`,
    de_DE: `Gitea Runner auf 3.3.2 aktualisiert.

- Workflows können \`NODE_OPTIONS\` nicht mehr über \`$GITHUB_ENV\` oder \`::set-env::\` setzen, wie bei GitHub.
- Kodierte Formen von Secrets, einschließlich Base64-Werten, werden jetzt in der Job-Ausgabe maskiert.
- Jobs und Schritte melden jetzt korrekte Ergebnisse für \`continue-on-error\`, Abbrüche und fehlgeschlagene \`if:\`-Ausdrücke.
- Composite Actions lösen \`matrix\`- und \`strategy\`-Werte jetzt korrekt auf, halten ihre Eingaben von verschachtelten Actions getrennt und verhindern, dass Container-Umgebungswerte Änderungen des Jobs überschreiben.
- Node-Actions, die symlinkfähige Einstiegspunkte benötigen, werden jetzt korrekt ausgeführt.

Vollständige Versionshinweise: https://gitea.com/gitea/runner/releases/tag/v3.3.2`,
    pl_PL: `Zaktualizowano Gitea Runner do 3.3.2.

- Przepływy pracy nie mogą już ustawiać \`NODE_OPTIONS\` przez \`$GITHUB_ENV\` ani \`::set-env::\`, tak jak w GitHubie.
- Zakodowane formy sekretów, w tym wartości Base64, są teraz maskowane w danych wyjściowych zadań.
- Zadania i kroki zgłaszają teraz dokładne wyniki dla \`continue-on-error\`, anulowania i błędnych wyrażeń \`if:\`.
- Akcje złożone poprawnie rozwiązują wartości \`matrix\` i \`strategy\`, izolują swoje dane wejściowe od zagnieżdżonych akcji i zapobiegają nadpisywaniu zmian zadania przez wartości środowiska kontenera.
- Akcje Node zależne od punktów wejścia obsługujących dowiązania symboliczne działają teraz poprawnie.

Pełne informacje o wydaniu: https://gitea.com/gitea/runner/releases/tag/v3.3.2`,
    fr_FR: `Gitea Runner mis à jour vers 3.3.2.

- Les workflows ne peuvent plus définir \`NODE_OPTIONS\` via \`$GITHUB_ENV\` ou \`::set-env::\`, comme sur GitHub.
- Les formes encodées des secrets, notamment les valeurs Base64, sont désormais masquées dans la sortie des jobs.
- Les jobs et les étapes signalent désormais des résultats exacts pour \`continue-on-error\`, les annulations et les expressions \`if:\` en échec.
- Les actions composites résolvent correctement les valeurs \`matrix\` et \`strategy\`, isolent leurs entrées des actions imbriquées et empêchent les valeurs d'environnement du conteneur de remplacer les modifications du job.
- Les actions Node qui dépendent de points d'entrée tenant compte des liens symboliques s'exécutent désormais correctement.

Notes de version complètes : https://gitea.com/gitea/runner/releases/tag/v3.3.2`,
  },
  migrations: {
    // No data migration: the store schema is unchanged across this bump.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
