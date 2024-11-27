import { HttpLink } from '@apollo/client'
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.SUPABASE_URL}/graphql/v1`,
      headers: {
        apiKey: `${process.env.SUPABASE_KEY}`,
      },
      fetchOptions: { cache: 'no-store' },
    }),
  })
})
