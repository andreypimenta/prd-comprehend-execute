import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  user_id: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  symptoms?: string[];
  health_goals?: string[];
  sleep_quality?: number;
  stress_level?: number;
  exercise_frequency?: number;
  created_at: string;
  updated_at: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkProfileComplete = (profile: UserProfile | null): boolean => {
    if (!profile) return false;
    
    // Check if all required fields are filled
    return !!(
      profile.age &&
      profile.gender &&
      profile.weight &&
      profile.height &&
      profile.symptoms &&
      profile.symptoms.length > 0 &&
      profile.health_goals &&
      profile.health_goals.length > 0 &&
      profile.sleep_quality &&
      profile.stress_level &&
      profile.exercise_frequency !== undefined
    );
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setProfile(null);
          setLoading(false);
          return;
        }

        console.log("🔍 useUserProfile: Buscando perfil para usuário:", user.id);

        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error("🔍 useUserProfile: Erro ao buscar perfil:", error);
          setError(error.message);
        } else {
          console.log("🔍 useUserProfile: Perfil encontrado:", data);
          setProfile(data);
        }
      } catch (err) {
        console.error("🔍 useUserProfile: Erro inesperado:", err);
        setError("Erro ao buscar perfil do usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    hasProfile: !!profile,
    isProfileComplete: checkProfileComplete(profile),
    refetch: async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setProfile(null);
          return;
        }

        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          setError(error.message);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError("Erro ao buscar perfil do usuário");
      } finally {
        setLoading(false);
      }
    }
  };
}