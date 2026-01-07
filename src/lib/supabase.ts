import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a lazy-initialized Supabase client to handle missing env vars during build
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseInstance;
}

// Export a proxy that lazily accesses the client
export const supabase = {
  get auth() {
    return getSupabaseClient().auth;
  },
};

// Google OAuth sign in
export async function signInWithGoogle() {
  const client = getSupabaseClient();

  // Get the current origin for redirect
  const redirectUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : '';

  console.log('Starting Google OAuth with redirect:', redirectUrl);

  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Google OAuth error:', error);
    throw error;
  }

  console.log('OAuth initiated:', data);
  return data;
}

// Sign out from Supabase
export async function signOutFromSupabase() {
  const client = getSupabaseClient();
  const { error } = await client.auth.signOut();
  if (error) {
    throw error;
  }
}

// Get current Supabase session
export async function getSupabaseSession() {
  const client = getSupabaseClient();
  const { data: { session }, error } = await client.auth.getSession();
  if (error) {
    throw error;
  }
  return session;
}

// Get current Supabase user
export async function getSupabaseUser() {
  const client = getSupabaseClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error) {
    throw error;
  }
  return user;
}
