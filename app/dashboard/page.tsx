"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Video, 
  Calendar, 
  Sparkles, 
  LogOut, 
  Coins, 
  Plus, 
  Share2, 
  Loader2, 
  User, 
  Layers,
  ArrowRight
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { supabase, user, isLoading } = useSupabase();
  const [profile, setProfile] = useState<{ full_name: string | null; plan: string; credits: number } | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
      return;
    }

    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, plan, credits")
          .eq("id", user.id)
          .single();

        if (data && !error) {
          setProfile(data);
        } else {
          // Fallback if trigger hasn't completed yet
          setProfile({
            full_name: (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Creator",
            plan: "free",
            credits: 50,
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setProfileLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, isLoading, router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col">
      {/* Dashboard Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
                V
              </div>
              <span className="text-lg font-bold tracking-tight">VdoMaker</span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-zinc-900 border border-border/50 rounded-full px-2.5 py-0.5">
              Studio
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Credits badge */}
            <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
              <Coins className="h-3.5 w-3.5" />
              <span>{profile?.credits ?? 50} Credits</span>
            </div>

            {/* User display */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">{profile?.full_name || user?.email}</span>
            </div>

            {/* Logout button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 p-8 sm:p-10 mb-8">
          <div className="absolute right-0 top-0 -z-10 h-full w-1/3 bg-primary/10 blur-3xl pointer-events-none" />
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Welcome to your workspace
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Hello, {profile?.full_name || "Creator"} 👋
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
              Generate captivating AI videos from simple prompts and automatically publish them across TikTok, YouTube Shorts, and Instagram Reels.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full gap-2 shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4" />
                Create New Video
              </Button>
              <Button variant="outline" className="rounded-full gap-2 border-border/60">
                <Calendar className="h-4 w-4" />
                Schedule Queue
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50 bg-zinc-950/60 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Credits</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.credits ?? 50}</div>
              <p className="text-xs text-muted-foreground mt-1">Refills on next billing cycle</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-zinc-950/60 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Videos Generated</CardTitle>
              <Video className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">Start by creating your first AI video</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-zinc-950/60 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Posts</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">No pending publications</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-zinc-950/60 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Connected Channels</CardTitle>
              <Share2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">Connect YouTube, TikTok & IG</p>
            </CardContent>
          </Card>
        </div>

        {/* Studio Content Area / Empty State */}
        <Card className="border-border/50 bg-zinc-950/40">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Recent Video Projects
            </CardTitle>
            <CardDescription>All your generated AI videos, prompts, and rendering statuses</CardDescription>
          </CardHeader>
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-border/60 flex items-center justify-center text-muted-foreground mb-4">
              <Video className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No videos yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              You haven&apos;t generated any AI videos yet. Write a prompt to create your very first viral short!
            </p>
            <Button className="rounded-full gap-2 shadow-lg shadow-primary/20">
              <Sparkles className="h-4 w-4" />
              Generate Your First Video
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
