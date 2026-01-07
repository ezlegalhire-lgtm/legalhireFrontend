'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const processAuthSession = useCallback(async (session: any, user: any) => {
    const email = user.email || '';
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || email.split('@')[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || '';
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || '';

    const clientData = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: user.phone || '',
      avatarUrl: avatarUrl,
      isVerified: user.email_confirmed_at ? true : false,
      provider: 'google',
    };

    // Store the session data
    localStorage.setItem('clientToken', session.access_token);
    localStorage.setItem('clientData', JSON.stringify(clientData));

    // Trigger storage event for header to update
    window.dispatchEvent(new Event('storage'));

    console.log('Google auth successful, user logged in:', email);

    // Clear the hash from URL if present
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    return clientData;
  }, []);

  // Restore session from Supabase if localStorage is missing but Supabase has a valid session
  const restoreSessionIfNeeded = useCallback(async () => {
    try {
      const existingToken = localStorage.getItem('clientToken');
      const existingData = localStorage.getItem('clientData');

      // If we already have valid localStorage data for a Google user, skip
      if (existingToken && existingData) {
        try {
          const parsed = JSON.parse(existingData);
          if (parsed.provider === 'google') {
            // Verify the Supabase session is still valid
            const { supabase } = await import('@/lib/supabase');
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              // Session is valid, update token if different
              if (session.access_token !== existingToken) {
                localStorage.setItem('clientToken', session.access_token);
              }
              return; // Session is valid, no need to restore
            }
          }
        } catch (e) {
          // Continue to restore
        }
      }

      // Check if Supabase has a valid session that we need to restore
      const { supabase } = await import('@/lib/supabase');
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        return;
      }

      if (session && session.user) {
        console.log('Restoring session from Supabase for:', session.user.email);
        await processAuthSession(session, session.user);
      }
    } catch (err) {
      console.error('Error restoring session:', err);
    }
  }, [processAuthSession]);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { supabase } = await import('@/lib/supabase');

        // Check current URL for OAuth response
        const hash = window.location.hash;
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const errorParam = urlParams.get('error');

        console.log('Auth check - Hash:', hash ? 'present' : 'none', 'Code:', code ? 'present' : 'none');

        // Handle error from OAuth
        if (errorParam) {
          console.error('OAuth error:', errorParam, urlParams.get('error_description'));
          return;
        }

        // Handle PKCE code flow
        if (code && pathname !== '/auth/callback') {
          console.log('Redirecting to callback with code...');
          router.push(`/auth/callback?code=${code}`);
          return;
        }

        // Handle implicit flow (hash contains tokens)
        if (hash && hash.includes('access_token')) {
          console.log('Processing hash tokens...');

          // Parse the hash
          const hashParams = new URLSearchParams(hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');

          if (accessToken) {
            // Set the session manually
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });

            if (error) {
              console.error('Error setting session:', error);
            } else if (data.session && data.user && mounted) {
              await processAuthSession(data.session, data.user);

              // Redirect to dashboard if on login/register page
              if (pathname === '/client/login' || pathname === '/client/register' || pathname === '/home') {
                router.push('/client/dashboard');
              }
            }
            return;
          }
        }

        // Always try to restore session from Supabase (handles redirect from external payment pages)
        await restoreSessionIfNeeded();

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event);

          if (!mounted) return;

          if (event === 'SIGNED_IN' && session && session.user) {
            await processAuthSession(session, session.user);

            // Redirect to dashboard
            if (pathname === '/client/login' || pathname === '/client/register') {
              router.push('/client/dashboard');
            }
          }

          if (event === 'SIGNED_OUT') {
            const clientData = localStorage.getItem('clientData');
            if (clientData) {
              try {
                const data = JSON.parse(clientData);
                if (data.provider === 'google') {
                  localStorage.removeItem('clientToken');
                  localStorage.removeItem('clientData');
                  window.dispatchEvent(new Event('storage'));
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }

          // Handle token refresh
          if (event === 'TOKEN_REFRESHED' && session) {
            console.log('Token refreshed, updating localStorage');
            localStorage.setItem('clientToken', session.access_token);
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Auth initialization error:', err);
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, [router, pathname, processAuthSession, restoreSessionIfNeeded]);

  return <>{children}</>;
}
