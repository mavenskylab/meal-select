import { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
  schema: [
    {
      [`${process.env.SUPABASE_URL}/graphql/v1`]: {
        headers: { apiKey: `${process.env.SUPABASE_KEY}` },
      },
    },
  ],
  documents: ['{app,components,lib}/**/*.{ts,tsx}'],
  generates: {
    'lib/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
