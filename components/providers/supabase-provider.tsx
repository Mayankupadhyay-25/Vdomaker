"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session, User, SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { supabase as browserSupabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type SupabaseContextType = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
  user: User | null;
  isLoading: boolean;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    // Fetch initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await browserSupabase.auth.getSession();

        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.error("Error fetching initial Supabase session:", err);
          setIsLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth state changes (sign in, sign out, token refresh)
    const {
      data: { subscription },
    } = browserSupabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsLoading(false);

      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <SupabaseContext.Provider
      value={{
        supabase: browserSupabase,
        session,
        user,
        isLoading,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}

/**
 * Access the global Supabase client, current session, and user.
 */
export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
}

/**
 * Convenience hook to access the current authenticated user directly.
 */
export function useUser() {
  const { user } = useSupabase();
  return user;
}
