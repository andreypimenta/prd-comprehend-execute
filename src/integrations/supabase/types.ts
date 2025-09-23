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
      bioavailability_data: {
        Row: {
          absorption_rate: number
          bioavailability_factor: number
          clinical_evidence: string | null
          contraindications: Json | null
          cost_multiplier: number | null
          created_at: string
          duration_hours: number | null
          id: string
          inhibitory_compounds: Json | null
          mechanism_description: string | null
          optimal_conditions: Json | null
          peak_time_hours: number | null
          pharmaceutical_form: string
          supplement_id: string
          synergistic_compounds: Json | null
          updated_at: string
        }
        Insert: {
          absorption_rate?: number
          bioavailability_factor?: number
          clinical_evidence?: string | null
          contraindications?: Json | null
          cost_multiplier?: number | null
          created_at?: string
          duration_hours?: number | null
          id?: string
          inhibitory_compounds?: Json | null
          mechanism_description?: string | null
          optimal_conditions?: Json | null
          peak_time_hours?: number | null
          pharmaceutical_form: string
          supplement_id: string
          synergistic_compounds?: Json | null
          updated_at?: string
        }
        Update: {
          absorption_rate?: number
          bioavailability_factor?: number
          clinical_evidence?: string | null
          contraindications?: Json | null
          cost_multiplier?: number | null
          created_at?: string
          duration_hours?: number | null
          id?: string
          inhibitory_compounds?: Json | null
          mechanism_description?: string | null
          optimal_conditions?: Json | null
          peak_time_hours?: number | null
          pharmaceutical_form?: string
          supplement_id?: string
          synergistic_compounds?: Json | null
          updated_at?: string
        }
        Relationships: []
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
      protocol_optimizations: {
        Row: {
          confidence_score: number | null
          cost_benefit_analysis: Json | null
          created_at: string | null
          id: string
          optimization_objective: string
          optimized_dosages: Json
          predicted_outcomes: Json | null
          protocol_id: string | null
          safety_constraints: Json | null
          supplement_combination: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          cost_benefit_analysis?: Json | null
          created_at?: string | null
          id?: string
          optimization_objective?: string
          optimized_dosages: Json
          predicted_outcomes?: Json | null
          protocol_id?: string | null
          safety_constraints?: Json | null
          supplement_combination: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          cost_benefit_analysis?: Json | null
          created_at?: string | null
          id?: string
          optimization_objective?: string
          optimized_dosages?: Json
          predicted_outcomes?: Json | null
          protocol_id?: string | null
          safety_constraints?: Json | null
          supplement_combination?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      protocol_recommendations: {
        Row: {
          confidence_score: number
          created_at: string
          id: string
          is_active: boolean | null
          personalization_notes: string | null
          protocol_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          confidence_score?: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          personalization_notes?: string | null
          protocol_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          confidence_score?: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          personalization_notes?: string | null
          protocol_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "protocol_recommendations_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "therapeutic_protocols"
            referencedColumns: ["id"]
          },
        ]
      }
      quantitative_analysis: {
        Row: {
          analysis_type: string
          confidence_interval: Json | null
          created_at: string | null
          id: string
          input_parameters: Json
          results: Json
          statistical_significance: number | null
          supplement_ids: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_type: string
          confidence_interval?: Json | null
          created_at?: string | null
          id?: string
          input_parameters?: Json
          results?: Json
          statistical_significance?: number | null
          supplement_ids: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_type?: string
          confidence_interval?: Json | null
          created_at?: string | null
          id?: string
          input_parameters?: Json
          results?: Json
          statistical_significance?: number | null
          supplement_ids?: string[]
          updated_at?: string | null
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
      scientific_evidence: {
        Row: {
          authors: string[] | null
          created_at: string
          database_source: string
          doi: string | null
          id: string
          intervention: string | null
          outcome_measures: string[] | null
          pmid: string | null
          publication_date: string | null
          quality_score: number | null
          raw_data: Json | null
          results_summary: string | null
          sample_size: number | null
          study_id: string
          study_type: string | null
          supplement_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          authors?: string[] | null
          created_at?: string
          database_source: string
          doi?: string | null
          id?: string
          intervention?: string | null
          outcome_measures?: string[] | null
          pmid?: string | null
          publication_date?: string | null
          quality_score?: number | null
          raw_data?: Json | null
          results_summary?: string | null
          sample_size?: number | null
          study_id: string
          study_type?: string | null
          supplement_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          authors?: string[] | null
          created_at?: string
          database_source?: string
          doi?: string | null
          id?: string
          intervention?: string | null
          outcome_measures?: string[] | null
          pmid?: string | null
          publication_date?: string | null
          quality_score?: number | null
          raw_data?: Json | null
          results_summary?: string | null
          sample_size?: number | null
          study_id?: string
          study_type?: string | null
          supplement_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
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
          absorption_enhancers: Json | null
          absorption_inhibitors: Json | null
          agent_category: string | null
          benefits: string[]
          bioavailability_score: number | null
          category: string
          circadian_timing: Json | null
          clinical_trials: Json | null
          cochrane_reviews: Json | null
          contraindications: string[]
          cost_benefit_form: string | null
          created_at: string
          description: string
          dosage_max: number
          dosage_min: number
          dosage_unit: string
          evidence_classification: string | null
          evidence_level: string
          food_interactions: Json | null
          id: string
          integrated_evidence_score: number | null
          interactions: string[]
          last_evidence_update: string | null
          mechanism: string | null
          medical_conditions: string[] | null
          ml_features: Json | null
          monte_carlo_data: Json | null
          name: string
          optimal_form: string | null
          pharmaceutical_forms: Json | null
          pharmgkb_data: Json | null
          pk_parameters: Json | null
          population_variability: Json | null
          price_max: number | null
          price_min: number | null
          priority_level: string | null
          pubmed_studies: Json | null
          scientific_evidence: string | null
          synergy_potential: string | null
          target_symptoms: string[]
          timing: string
          updated_at: string
        }
        Insert: {
          absorption_enhancers?: Json | null
          absorption_inhibitors?: Json | null
          agent_category?: string | null
          benefits?: string[]
          bioavailability_score?: number | null
          category: string
          circadian_timing?: Json | null
          clinical_trials?: Json | null
          cochrane_reviews?: Json | null
          contraindications?: string[]
          cost_benefit_form?: string | null
          created_at?: string
          description: string
          dosage_max: number
          dosage_min: number
          dosage_unit?: string
          evidence_classification?: string | null
          evidence_level?: string
          food_interactions?: Json | null
          id: string
          integrated_evidence_score?: number | null
          interactions?: string[]
          last_evidence_update?: string | null
          mechanism?: string | null
          medical_conditions?: string[] | null
          ml_features?: Json | null
          monte_carlo_data?: Json | null
          name: string
          optimal_form?: string | null
          pharmaceutical_forms?: Json | null
          pharmgkb_data?: Json | null
          pk_parameters?: Json | null
          population_variability?: Json | null
          price_max?: number | null
          price_min?: number | null
          priority_level?: string | null
          pubmed_studies?: Json | null
          scientific_evidence?: string | null
          synergy_potential?: string | null
          target_symptoms?: string[]
          timing?: string
          updated_at?: string
        }
        Update: {
          absorption_enhancers?: Json | null
          absorption_inhibitors?: Json | null
          agent_category?: string | null
          benefits?: string[]
          bioavailability_score?: number | null
          category?: string
          circadian_timing?: Json | null
          clinical_trials?: Json | null
          cochrane_reviews?: Json | null
          contraindications?: string[]
          cost_benefit_form?: string | null
          created_at?: string
          description?: string
          dosage_max?: number
          dosage_min?: number
          dosage_unit?: string
          evidence_classification?: string | null
          evidence_level?: string
          food_interactions?: Json | null
          id?: string
          integrated_evidence_score?: number | null
          interactions?: string[]
          last_evidence_update?: string | null
          mechanism?: string | null
          medical_conditions?: string[] | null
          ml_features?: Json | null
          monte_carlo_data?: Json | null
          name?: string
          optimal_form?: string | null
          pharmaceutical_forms?: Json | null
          pharmgkb_data?: Json | null
          pk_parameters?: Json | null
          population_variability?: Json | null
          price_max?: number | null
          price_min?: number | null
          priority_level?: string | null
          pubmed_studies?: Json | null
          scientific_evidence?: string | null
          synergy_potential?: string | null
          target_symptoms?: string[]
          timing?: string
          updated_at?: string
        }
        Relationships: []
      }
      synergy_predictions: {
        Row: {
          confidence_level: number
          created_at: string | null
          id: string
          mechanism_description: string | null
          ml_model_version: string | null
          predicted_efficacy_boost: number | null
          safety_assessment: Json | null
          scientific_evidence: Json | null
          supplement_pair: string[]
          synergy_score: number
          updated_at: string | null
        }
        Insert: {
          confidence_level?: number
          created_at?: string | null
          id?: string
          mechanism_description?: string | null
          ml_model_version?: string | null
          predicted_efficacy_boost?: number | null
          safety_assessment?: Json | null
          scientific_evidence?: Json | null
          supplement_pair: string[]
          synergy_score?: number
          updated_at?: string | null
        }
        Update: {
          confidence_level?: number
          created_at?: string | null
          id?: string
          mechanism_description?: string | null
          ml_model_version?: string | null
          predicted_efficacy_boost?: number | null
          safety_assessment?: Json | null
          scientific_evidence?: Json | null
          supplement_pair?: string[]
          synergy_score?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      therapeutic_protocols: {
        Row: {
          condition: string
          created_at: string
          expected_efficacy: string | null
          id: string
          implementation_phases: Json | null
          individualization_factors: Json | null
          monitoring_parameters: Json | null
          supplement_combination: Json
          synergy_description: string | null
          updated_at: string
        }
        Insert: {
          condition: string
          created_at?: string
          expected_efficacy?: string | null
          id?: string
          implementation_phases?: Json | null
          individualization_factors?: Json | null
          monitoring_parameters?: Json | null
          supplement_combination?: Json
          synergy_description?: string | null
          updated_at?: string
        }
        Update: {
          condition?: string
          created_at?: string
          expected_efficacy?: string | null
          id?: string
          implementation_phases?: Json | null
          individualization_factors?: Json | null
          monitoring_parameters?: Json | null
          supplement_combination?: Json
          synergy_description?: string | null
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
      user_selected_supplements: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          recommendation_id: string
          start_date: string
          supplement_id: string
          target_duration_weeks: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          recommendation_id: string
          start_date?: string
          supplement_id: string
          target_duration_weeks?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          recommendation_id?: string
          start_date?: string
          supplement_id?: string
          target_duration_weeks?: number | null
          updated_at?: string
          user_id?: string
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
          feedback: Json | null
          focus_level: number | null
          id: string
          metrics: Json | null
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
          week_number_formatted: string | null
          weight: number | null
          wellbeing: Json | null
        }
        Insert: {
          checkin_date?: string
          created_at?: string
          custom_symptoms?: Json | null
          energy_level?: number | null
          exercise_frequency?: number | null
          fatigue_level?: number | null
          feedback?: Json | null
          focus_level?: number | null
          id?: string
          metrics?: Json | null
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
          week_number_formatted?: string | null
          weight?: number | null
          wellbeing?: Json | null
        }
        Update: {
          checkin_date?: string
          created_at?: string
          custom_symptoms?: Json | null
          energy_level?: number | null
          exercise_frequency?: number | null
          fatigue_level?: number | null
          feedback?: Json | null
          focus_level?: number | null
          id?: string
          metrics?: Json | null
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
          week_number_formatted?: string | null
          weight?: number | null
          wellbeing?: Json | null
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
