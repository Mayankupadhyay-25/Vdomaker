-- ==============================================================================
-- VdoMaker Supabase Development Seed Data
-- ==============================================================================

-- Note: Seed data that depends on auth.users requires an existing auth user ID.
-- Replace '00000000-0000-0000-0000-000000000000' with your actual test user UUID from auth.users.

/*
INSERT INTO public.profiles (id, email, full_name, plan, credits)
VALUES 
    ('00000000-0000-0000-0000-000000000000', 'demo@vdomaker.ai', 'Alex Creator', 'pro', 250)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.videos (id, user_id, title, prompt, script, status, aspect_ratio, duration_seconds)
VALUES 
    (
        '11111111-1111-1111-1111-111111111111',
        '00000000-0000-0000-0000-000000000000',
        '5 AI Tools to 10x Productivity in 2026',
        'Create a fast-paced viral reel about top 5 AI productivity tools in 2026',
        'Stop working 10 hours a day! Here are 5 AI tools that will save you 20 hours this week...',
        'completed',
        '9:16',
        45
    )
ON CONFLICT (id) DO NOTHING;
*/
