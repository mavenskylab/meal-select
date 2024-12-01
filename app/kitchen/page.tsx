import { OrderByDirection } from '@/lib/graphql'
import { unstable_cache } from 'next/cache'
import { getItems } from './_actions/items'
import Item from './_components/item'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const items = await unstable_cache(getItems, ['items'], {
    revalidate: 3600,
    tags: ['items'],
  })({
    ...query,
    orderBy: [
      { count: OrderByDirection.DescNullsLast },
      { name: OrderByDirection.AscNullsLast },
    ],
  })

  return items.map((item) => <Item key={item.node.id} item={item} />)
}
