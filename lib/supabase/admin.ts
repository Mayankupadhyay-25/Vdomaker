import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Creates an administrative Supabase client using the Service Role Key.
 * Bypasses Row Level Security (RLS).
 * CAUTION: Use this ONLY on the server in secure contexts (e.g., cron jobs, webhooks, worker queues).
 * NEVER expose the service role key to the browser.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
