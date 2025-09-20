export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null
          created_at: string
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          provider_account_id: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: Database["public"]["Enums"]["account_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: Database["public"]["Enums"]["account_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: Database["public"]["Enums"]["account_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      checkin_reminders: {
        Row: {
          created_at: string
          email_notifications: boolean
          id: string
          is_active: boolean
          next_checkin_date: string
          push_notifications: boolean
          reminder_frequency: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean
          id?: string
          is_active?: boolean
          next_checkin_date: string
          push_notifications?: boolean
          reminder_frequency?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean
          id?: string
          is_active?: boolean
          next_checkin_date?: string
          push_notifications?: boolean
          reminder_frequency?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          confidence: number
          created_at: string
          id: string
          priority: string
          reasoning: string
          recommended_dosage: number
          supplement_id: string
          user_id: string
        }
        Insert: {
          confidence: number
          created_at?: string
          id?: string
          priority?: string
          reasoning: string
          recommended_dosage: number
          supplement_id: string
          user_id: string
        }
        Update: {
          confidence?: number
          created_at?: string
          id?: string
          priority?: string
          reasoning?: string
          recommended_dosage?: number
          supplement_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_supplement_id_fkey"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplements"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          expires: string
          id: string
          session_token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires: string
          id?: string
          session_token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires?: string
          id?: string
          session_token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      supplements: {
        Row: {
          benefits: string[]
          category: string
          contraindications: string[]
          created_at: string
          description: string
          dosage_max: number
          dosage_min: number
          dosage_unit: string
          evidence_level: string
          id: string
          interactions: string[]
          name: string
          price_max: number | null
          price_min: number | null
          target_symptoms: string[]
          timing: string
          updated_at: string
        }
        Insert: {
          benefits?: string[]
          category: string
          contraindications?: string[]
          created_at?: string
          description: string
          dosage_max: number
          dosage_min: number
          dosage_unit?: string
          evidence_level?: string
          id: string
          interactions?: string[]
          name: string
          price_max?: number | null
          price_min?: number | null
          target_symptoms?: string[]
          timing?: string
          updated_at?: string
        }
        Update: {
          benefits?: string[]
          category?: string
          contraindications?: string[]
          created_at?: string
          description?: string
          dosage_max?: number
          dosage_min?: number
          dosage_unit?: string
          evidence_level?: string
          id?: string
          interactions?: string[]
          name?: string
          price_max?: number | null
          price_min?: number | null
          target_symptoms?: string[]
          timing?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          age: number | null
          created_at: string
          exercise_frequency: number | null
          gender: string | null
          health_goals: string[] | null
          height: number | null
          id: string
          sleep_quality: number | null
          stress_level: number | null
          symptoms: string[] | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          exercise_frequency?: number | null
          gender?: string | null
          health_goals?: string[] | null
          height?: number | null
          id?: string
          sleep_quality?: number | null
          stress_level?: number | null
          symptoms?: string[] | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string
          exercise_frequency?: number | null
          gender?: string | null
          health_goals?: string[] | null
          height?: number | null
          id?: string
          sleep_quality?: number | null
          stress_level?: number | null
          symptoms?: string[] | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string
          email_verified: string | null
          id: string
          image: string | null
          name: string | null
          password: string | null
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email: string
          email_verified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          password?: string | null
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string
          email_verified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          password?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      verification_tokens: {
        Row: {
          expires: string
          identifier: string
          token: string
        }
        Insert: {
          expires: string
          identifier: string
          token: string
        }
        Update: {
          expires?: string
          identifier?: string
          token?: string
        }
        Relationships: []
      }
      weekly_checkins: {
        Row: {
          checkin_date: string
          created_at: string
          custom_symptoms: Json | null
          energy_level: number | null
          exercise_frequency: number | null
          fatigue_level: number | null
          focus_level: number | null
          id: string
          mood_level: number | null
          notes: string | null
          overall_compliance_percentage: number | null
          side_effects: string | null
          sleep_quality: number | null
          stress_level: number | null
          supplement_adherence: Json | null
          updated_at: string
          user_id: string
          week_number: number
          weight: number | null
        }
        Insert: {
          checkin_date?: string
          created_at?: string
          custom_symptoms?: Json | null
          energy_level?: number | null
          exercise_frequency?: number | null
          fatigue_level?: number | null
          focus_level?: number | null
          id?: string
          mood_level?: number | null
          notes?: string | null
          overall_compliance_percentage?: number | null
          side_effects?: string | null
          sleep_quality?: number | null
          stress_level?: number | null
          supplement_adherence?: Json | null
          updated_at?: string
          user_id: string
          week_number: number
          weight?: number | null
        }
        Update: {
          checkin_date?: string
          created_at?: string
          custom_symptoms?: Json | null
          energy_level?: number | null
          exercise_frequency?: number | null
          fatigue_level?: number | null
          focus_level?: number | null
          id?: string
          mood_level?: number | null
          notes?: string | null
          overall_compliance_percentage?: number | null
          side_effects?: string | null
          sleep_quality?: number | null
          stress_level?: number | null
          supplement_adherence?: Json | null
          updated_at?: string
          user_id?: string
          week_number?: number
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_week_number: {
        Args: { user_id: string }
        Returns: number
      }
    }
    Enums: {
      account_type: "oauth" | "email" | "credentials"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["oauth", "email", "credentials"],
    },
  },
} as const
