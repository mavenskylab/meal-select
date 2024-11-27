declare global {
  namespace Node {
    interface ProcessEnv {
      // Supabase
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    }
  }
}
