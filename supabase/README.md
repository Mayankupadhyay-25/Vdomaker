# Supabase Setup for VdoMaker

This directory contains the database schema, migrations, and seeds for the **VdoMaker** application.

---

## 1. Quick Start

### Step 1: Create or Open a Supabase Project
1. Go to [https://database.new](https://database.new) to create a new project.
2. In your Supabase Project Dashboard, navigate to **Project Settings** -> **API**.
3. Copy the following keys:
   - **Project URL**
   - **`anon` `public` key**
   - **`service_role` secret** (keep this secret; never expose to client)

### Step 2: Configure Environment Variables
Add your credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 2. Apply Database Schema

### Option A: Via Supabase Dashboard (Fastest)
1. In your Supabase dashboard, go to the **SQL Editor** tab.
2. Open [`supabase/schema.sql`](file:///d:/Projects/vidmak/supabase/schema.sql).
3. Copy and paste the entire contents into the SQL Editor and click **Run**.

### Option B: Via Supabase CLI
If using Supabase CLI:
```bash
npx supabase db push
# or to start local docker supabase
npx supabase start
```

---

## 3. Database Architecture Overview

| Table | Description | RLS Policy |
| :--- | :--- | :--- |
| `profiles` | User profiles with subscription tiers (`free`, `creator`, `pro`, `enterprise`) and credit balances. | User-isolated (`auth.uid() = id`) |
| `videos` | AI video generation records, prompts, scripts, aspect ratio, status, and output URLs. | User-isolated (`auth.uid() = user_id`) |
| `social_accounts`| Connected social media credentials (YouTube, TikTok, Instagram, Twitter, LinkedIn). | User-isolated (`auth.uid() = user_id`) |
| `schedules` | Automated multi-platform video posting queue with scheduled timestamps. | User-isolated (`auth.uid() = user_id`) |
| `email_campaigns`| Email campaign configurations for sending video newsletters. | User-isolated (`auth.uid() = user_id`) |
| `analytics_events`| Video performance tracking (views, likes, shares, comments). | User-isolated (`auth.uid() = user_id`) |

### Automations Included:
- **`on_auth_user_created`**: Automatically creates a record in `public.profiles` when a user signs up.
- **`handle_updated_at`**: Automatically bumps `updated_at` timestamps on row updates.
- **Storage Buckets**: Preconfigured buckets for `videos`, `thumbnails`, and `avatars` with security policies.

---

## 4. Usage in Code

### A. In Client Components (with Hooks)
```tsx
"use client";

import { useSupabase, useUser } from "@/components/providers/supabase-provider";

export function UserProfileBadge() {
  const { supabase, session, isLoading } = useSupabase();
  const user = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not signed in</div>;

  return <div>Signed in as: {user.email}</div>;
}
```

### B. In Client Components (Direct Singleton)
```tsx
"use client";

import { supabase } from "@/lib/supabase/client";

async function handleSignIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}
```

### C. In Server Components, Server Actions & Route Handlers
```tsx
import { createClient } from "@/lib/supabase/server";

export default async function VideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ul>
      {videos?.map((v) => (
        <li key={v.id}>{v.title}</li>
      ))}
    </ul>
  );
}
```

### D. In Secure Background Workers / Admin Scripts (Bypasses RLS)
```tsx
import { createAdminClient } from "@/lib/supabase/admin";

export async function processVideoGenerationJob(videoId: string) {
  const supabaseAdmin = createAdminClient();
  await supabaseAdmin
    .from("videos")
    .update({ status: "generating" })
    .eq("id", videoId);
}
```
