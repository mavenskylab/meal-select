'use client'

import React from 'react'
import { Font, setFont } from '../_actions/font'
import { IconContext } from 'react-icons'
import { FontContext } from './contexts/font-context'

type Provider<P = unknown> = {
  Provider: React.ComponentType<React.PropsWithChildren<P>>
  props?: Omit<P, 'children'>
}

export default function Providers({
  font,
  children,
}: {
  font: Font
  children: React.ReactNode
}) {
  return (
    <ProviderList
      providers={[
        { Provider: FontContext.Provider, props: { value: { font, setFont } } },
        {
          Provider: IconContext.Provider,
          props: { value: { className: 'size-6' } },
        },
      ]}
    >
      {children}
    </ProviderList>
  )
}

export function ProviderList<Providers extends Array<Provider<any>>>({
  providers,
  children,
}: {
  providers: Providers
  children: React.ReactNode
}) {
  return providers.reduceRight(
    (providers, { Provider, props }) => (
      <Provider {...props}>{providers}</Provider>
    ),
    children,
  )
}
