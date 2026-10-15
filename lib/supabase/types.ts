export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserPlan = "free" | "creator" | "pro" | "enterprise";
export type VideoStatus = "draft" | "generating" | "completed" | "failed";
export type AspectRatio = "9:16" | "16:9" | "1:1";
export type SocialPlatform = "youtube" | "instagram" | "tiktok" | "twitter" | "linkedin";
export type ScheduleStatus = "scheduled" | "publishing" | "published" | "failed" | "cancelled";
export type EmailCampaignStatus = "draft" | "scheduled" | "sending" | "sent" | "failed";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: UserPlan;
          credits: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: UserPlan;
          credits?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: UserPlan;
          credits?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      videos: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          prompt: string | null;
          script: string | null;
          status: VideoStatus;
          aspect_ratio: AspectRatio;
          duration_seconds: number | null;
          voice_id: string | null;
          video_url: string | null;
          thumbnail_url: string | null;
          error_message: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          prompt?: string | null;
          script?: string | null;
          status?: VideoStatus;
          aspect_ratio?: AspectRatio;
          duration_seconds?: number | null;
          voice_id?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          error_message?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          prompt?: string | null;
          script?: string | null;
          status?: VideoStatus;
          aspect_ratio?: AspectRatio;
          duration_seconds?: number | null;
          voice_id?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          error_message?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "videos_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      social_accounts: {
        Row: {
          id: string;
          user_id: string;
          platform: SocialPlatform;
          platform_user_id: string;
          platform_username: string | null;
          avatar_url: string | null;
          access_token: string | null;
          refresh_token: string | null;
          token_expires_at: string | null;
          is_connected: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: SocialPlatform;
          platform_user_id: string;
          platform_username?: string | null;
          avatar_url?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          is_connected?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform?: SocialPlatform;
          platform_user_id?: string;
          platform_username?: string | null;
          avatar_url?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          is_connected?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "social_accounts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      schedules: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          social_account_id: string | null;
          platform: SocialPlatform;
          caption: string | null;
          scheduled_for: string;
          published_at: string | null;
          status: ScheduleStatus;
          external_post_id: string | null;
          external_post_url: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_id: string;
          social_account_id?: string | null;
          platform: SocialPlatform;
          caption?: string | null;
          scheduled_for: string;
          published_at?: string | null;
          status?: ScheduleStatus;
          external_post_id?: string | null;
          external_post_url?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          video_id?: string;
          social_account_id?: string | null;
          platform?: SocialPlatform;
          caption?: string | null;
          scheduled_for?: string;
          published_at?: string | null;
          status?: ScheduleStatus;
          external_post_id?: string | null;
          external_post_url?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "schedules_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "schedules_video_id_fkey";
            columns: ["video_id"];
            isOneToOne: false;
            referencedRelation: "videos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "schedules_social_account_id_fkey";
            columns: ["social_account_id"];
            isOneToOne: false;
            referencedRelation: "social_accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      email_campaigns: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          title: string;
          subject: string | null;
          status: EmailCampaignStatus;
          scheduled_for: string | null;
          sent_at: string | null;
          recipient_count: number;
          open_count: number;
          click_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_id: string;
          title: string;
          subject?: string | null;
          status?: EmailCampaignStatus;
          scheduled_for?: string | null;
          sent_at?: string | null;
          recipient_count?: number;
          open_count?: number;
          click_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          video_id?: string;
          title?: string;
          subject?: string | null;
          status?: EmailCampaignStatus;
          scheduled_for?: string | null;
          sent_at?: string | null;
          recipient_count?: number;
          open_count?: number;
          click_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "email_campaigns_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "email_campaigns_video_id_fkey";
            columns: ["video_id"];
            isOneToOne: false;
            referencedRelation: "videos";
            referencedColumns: ["id"];
          }
        ];
      };
      analytics_events: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          platform: string;
          views: number;
          likes: number;
          comments: number;
          shares: number;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_id: string;
          platform: string;
          views?: number;
          likes?: number;
          comments?: number;
          shares?: number;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          video_id?: string;
          platform?: string;
          views?: number;
          likes?: number;
          comments?: number;
          shares?: number;
          recorded_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "analytics_events_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "analytics_events_video_id_fkey";
            columns: ["video_id"];
            isOneToOne: false;
            referencedRelation: "videos";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_plan: UserPlan;
      video_status: VideoStatus;
      aspect_ratio: AspectRatio;
      social_platform: SocialPlatform;
      schedule_status: ScheduleStatus;
      email_campaign_status: EmailCampaignStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
