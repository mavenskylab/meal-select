export function shuffle<T>(array: T[]) {
  return array.toSorted(() => Math.random() - 0.5)
}
