import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

/**
 * Creates or retrieves a singleton Supabase client for Client Components.
 * Uses cookies for session persistence to remain in sync with SSR and middleware.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== "undefined") {
      console.warn(
        "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing. Please add them to your .env.local file."
      );
    }
  }

  if (client) return client;

  client = createBrowserClient<Database>(
    supabaseUrl || "https://placeholder-project.supabase.co",
    supabaseAnonKey || "placeholder-anon-key",
    {
      isSingleton: true,
    }
  );

  return client;
}

/**
 * Global singleton browser Supabase client.
 * Import directly in client components:
 * import { supabase } from "@/lib/supabase/client";
 */
export const supabase = createClient();
