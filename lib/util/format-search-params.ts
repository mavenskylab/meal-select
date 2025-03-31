import 'server-only'

export function formatSearchParams(
  searchParams: Record<string, string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => {
      if (key.endsWith('[]')) {
        return [
          key.substring(0, key.length - 2),
          Array.isArray(value) ? value : [value],
        ]
      }

      return [key, value]
    }),
  )
}
