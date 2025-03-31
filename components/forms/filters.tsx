'use client'

import Select from '@/components/forms/select'
import {
  useSearchParams,
  type SearchParamsReturn,
} from '@/hooks/use-search-params'
import { cn } from '@/lib/util/cn'
import { ChangeEvent } from 'react'

export type FilterItem = {
  id: number | string
  name: string
}

export type FiltersProps = {
  label: string
  items: FilterItem[]
}

export type FilterSearchParams = {
  includes?: string[]
  requires?: string[]
  excludes?: string[]
}

export default function Filters({ label, items }: FiltersProps) {
  const searchParamsProps = useSearchParams<FilterSearchParams>()

  return <FiltersFallback label={label} items={items} {...searchParamsProps} />
}

export function FiltersFallback({
  label,
  items,
  searchParams,
  setSearchParam,
}: FiltersProps & Partial<SearchParamsReturn<FilterSearchParams>>) {
  const { includes = [], requires = [], excludes = [] } = searchParams ?? {}

  const filteredTags = items.filter(
    (item) =>
      ![...includes, ...requires, ...excludes].includes(item.id.toString()),
  )

  function handleAddFilter(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value

    setSearchParam?.({ includes: [...includes, value] })

    e.target.value = ''
  }

  return (
    <div>
      <Select label={label} onChange={handleAddFilter}>
        <option value=''>-</option>
        {filteredTags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </Select>
    </div>
  )
}

export function FilterBadges({ items }: Pick<FiltersProps, 'items'>) {
  const { searchParams, setSearchParam } = useSearchParams<FilterSearchParams>()

  const types = ['includes', 'requires', 'excludes'] as const

  function handleChange(id: string, type: keyof FilterSearchParams) {
    console.log(searchParams[type])
    const nextType = type === 'includes' ? 'requires' : 'excludes'

    setSearchParam({
      [type]: searchParams[type]?.filter((itemId) => itemId !== id),
      ...(type !== 'excludes' && {
        [nextType]: [...(searchParams[nextType] ?? []), id],
      }),
    })
  }

  return (
    <>
      {types.flatMap((type) =>
        searchParams[type]?.map((id) => (
          <FilterBadge
            key={id}
            type={type}
            onClick={handleChange.bind(null, id, type)}
            {...items.find((item) => item.id.toString() === id)!}
          />
        )),
      )}
    </>
  )
}

function FilterBadge({
  name,
  type,
  onClick,
}: FilterItem & { type: keyof FilterSearchParams; onClick: () => void }) {
  return (
    <span
      className={cn('badge', {
        'badge-success': type === 'includes',
        'badge-info': type === 'requires',
        'badge-error line-through': type === 'excludes',
      })}
      onClick={onClick}
    >
      {name}
      {type === 'includes' && '?'}
      {type === 'requires' && '!'}
    </span>
  )
}
