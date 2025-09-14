-- Step 1: Drop existing RLS policies on user_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.user_profiles;

-- Step 2: Create types
DO $$ BEGIN
    CREATE TYPE account_type AS ENUM ('oauth', 'email', 'credentials');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 3: Create users table following PRD schema
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT,
  email_verified TIMESTAMP WITH TIME ZONE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Step 4: Create accounts table for OAuth
CREATE TABLE IF NOT EXISTS public.accounts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type account_type NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  UNIQUE(provider, provider_account_id)
);

-- Step 5: Create sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_token TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Step 6: Create verification tokens table
CREATE TABLE IF NOT EXISTS public.verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  
  PRIMARY KEY (identifier, token)
);

-- Step 7: Alter user_profiles table to use TEXT for user_id
ALTER TABLE public.user_profiles 
  ALTER COLUMN user_id TYPE TEXT USING user_id::text;

-- Step 8: Enable RLS on new tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_tokens ENABLE ROW LEVEL SECURITY;

-- Step 9: Create RLS policies for users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid()::text = id);

-- Step 10: Create RLS policies for accounts
CREATE POLICY "Users can view own accounts" ON public.accounts
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can update own accounts" ON public.accounts
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own accounts" ON public.accounts
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- Step 11: Create RLS policies for sessions
CREATE POLICY "Users can view own sessions" ON public.sessions
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete own sessions" ON public.sessions
  FOR DELETE USING (user_id = auth.uid()::text);

-- Step 12: Recreate user_profiles policies with TEXT user_id
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own profile" ON public.user_profiles
  FOR DELETE USING (auth.uid()::text = user_id);

-- Step 13: Create update triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();