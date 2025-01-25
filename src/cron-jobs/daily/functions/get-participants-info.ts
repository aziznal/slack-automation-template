/**
 * Formats given participant names into a string representing a list of the names in random order.
 *
 * Example:
 * ```typescript
 * getParticipantsInfo("Walter", "Jesse", "Gus");
 *
 * // 1. Gus
 * // 2. Walter
 * // 3. Jesse
 *
 * ```
 */
export function getParticipantsInfo(...participants: string[]) {
  return randomizeArray(participants)
    .map((participant, i) => `  ${i}. ${participant}`)
    .join("\n");
}

function randomizeArray<T>(array: T[]) {
  const cloned = [...array];

  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return cloned;
}
