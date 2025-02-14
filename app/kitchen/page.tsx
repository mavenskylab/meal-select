import { getItems } from './_actions/items'
import Item from './_components/item'
import { getTags } from '../account/tags/_actions/tags'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const tags = await getTags()
  const items = await getItems(query)

  return items.map((item) => <Item key={item.id} tags={tags} item={item} />)
}
