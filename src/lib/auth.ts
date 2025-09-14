// Following PRD auth utilities structure
import { supabase } from "@/integrations/supabase/client";
import type { User, AuthResponse, SignInCredentials, SignUpCredentials } from "@/types/auth";

// Database query utilities
export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      authUserId: data.auth_user_id,
      email: data.email,
      name: data.name,
      password: data.password,
      emailVerified: data.email_verified ? new Date(data.email_verified) : undefined,
      image: data.image,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserByAuthId(authUserId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', authUserId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      authUserId: data.auth_user_id,
      email: data.email,
      name: data.name,
      password: data.password,
      emailVerified: data.email_verified ? new Date(data.email_verified) : undefined,
      image: data.image,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Error fetching user by auth ID:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      authUserId: data.auth_user_id,
      email: data.email,
      name: data.name,
      password: data.password,
      emailVerified: data.email_verified ? new Date(data.email_verified) : undefined,
      image: data.image,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

export async function createUser(userData: {
  authUserId: string;
  email: string;
  name?: string;
  image?: string;
}): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        auth_user_id: userData.authUserId,
        email: userData.email,
        name: userData.name,
        image: userData.image,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating user:', error);
      return null;
    }

    return {
      id: data.id,
      authUserId: data.auth_user_id,
      email: data.email,
      name: data.name,
      password: data.password,
      emailVerified: data.email_verified ? new Date(data.email_verified) : undefined,
      image: data.image,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        email: updates.email,
        name: updates.name,
        image: updates.image,
        email_verified: updates.emailVerified?.toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating user:', error);
      return null;
    }

    return {
      id: data.id,
      authUserId: data.auth_user_id,
      email: data.email,
      name: data.name,
      password: data.password,
      emailVerified: data.email_verified ? new Date(data.email_verified) : undefined,
      image: data.image,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

// Auth utilities
export async function signIn(credentials: SignInCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { error: { message: error.message, code: error.message } };
    }

    if (!data.user) {
      return { error: { message: "Erro inesperado no login" } };
    }

    // Get our custom user data
    const user = await getUserByAuthId(data.user.id);
    
    return {
      user: user || undefined,
      session: data.session ? {
        id: data.session.access_token.substring(0, 20), // Use part of token as ID
        sessionToken: data.session.access_token,
        userId: user?.id || '',
        expires: new Date(data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 3600000),
        createdAt: new Date(),
      } : undefined,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return { error: { message: "Erro inesperado no login" } };
  }
}

export async function signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          name: credentials.name,
        }
      }
    });

    if (error) {
      return { error: { message: error.message, code: error.message } };
    }

    if (!data.user) {
      return { error: { message: "Erro inesperado no cadastro" } };
    }

    // User will be created automatically by our trigger
    const user = await getUserByAuthId(data.user.id);
    
    return {
      user: user || undefined,
      session: data.session ? {
        id: data.session.access_token.substring(0, 20),
        sessionToken: data.session.access_token,
        userId: user?.id || '',
        expires: new Date(data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 3600000),
        createdAt: new Date(),
      } : undefined,
    };
  } catch (error) {
    console.error('Error signing up:', error);
    return { error: { message: "Erro inesperado no cadastro" } };
  }
}

export async function signOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function signInWithProvider(provider: 'google' | 'apple'): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      return { error: { message: error.message, code: error.message } };
    }

    // OAuth flow will redirect, so we return success here
    return {};
  } catch (error) {
    console.error(`Error signing in with ${provider}:`, error);
    return { error: { message: `Erro no login com ${provider}` } };
  }
}

export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      return null;
    }

    const user = await getUserByAuthId(session.user.id);
    
    return {
      user,
      session: {
        id: session.access_token.substring(0, 20),
        sessionToken: session.access_token,
        userId: user?.id || '',
        expires: new Date(session.expires_at ? session.expires_at * 1000 : Date.now() + 3600000),
        createdAt: new Date(),
      }
    };
  } catch (error) {
    console.error('Error getting current session:', error);
    return null;
  }
}

export async function refreshSession(): Promise<void> {
  try {
    const { error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Error refreshing session:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error refreshing session:', error);
    throw error;
  }
}