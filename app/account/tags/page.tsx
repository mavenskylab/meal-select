import { getTags } from './_actions/tags'
import Tag from './_components/tag'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const tags = await getTags(query)

  return tags.map((tag) => <Tag key={tag.id} tag={tag} />)
}
