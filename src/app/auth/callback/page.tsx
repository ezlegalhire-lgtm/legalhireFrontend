'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing your sign-in...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { supabase } = await import('@/lib/supabase');

        // Check for error in URL params
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          throw new Error(errorDescription || error);
        }

        // Check for auth code in URL (PKCE flow)
        const code = searchParams.get('code');

        if (code) {
          // Exchange the code for a session
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error('Code exchange error:', exchangeError);
            throw exchangeError;
          }

          if (data.session && data.user) {
            await processUserSession(data.session, data.user);
            return;
          }
        }

        // Fallback: Try to get existing session (for implicit flow or already authenticated)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (!session || !session.user) {
          // No session found - maybe the hash params need to be processed
          // Wait a moment for Supabase to process the URL hash
          await new Promise(resolve => setTimeout(resolve, 1000));

          const { data: { session: retrySession }, error: retryError } = await supabase.auth.getSession();

          if (retryError || !retrySession) {
            throw new Error('No session found. Please try signing in again.');
          }

          await processUserSession(retrySession, retrySession.user);
          return;
        }

        await processUserSession(session, session.user);

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'An error occurred during sign-in. Please try again.');
      }
    };

    const processUserSession = async (session: any, user: any) => {
      const email = user.email || '';
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || email.split('@')[0] || 'User';
      const lastName = nameParts.slice(1).join(' ') || '';
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || '';

      setMessage('Verifying your account...');

      // Try to authenticate with the CMS backend
      try {
        const loginResponse = await fetch(`${API_BASE_URL}/api/public/client/google-auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            supabaseId: user.id,
            firstName: firstName,
            lastName: lastName,
            phone: user.phone || '',
            provider: 'google',
            accessToken: session.access_token,
          }),
        });

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          if (data.token && data.client) {
            localStorage.setItem('clientToken', data.token);
            localStorage.setItem('clientData', JSON.stringify(data.client));
            window.dispatchEvent(new Event('storage'));

            setStatus('success');
            setMessage('Sign-in successful! Redirecting to dashboard...');

            setTimeout(() => {
              router.push('/client/dashboard');
            }, 1500);
            return;
          }
        }
      } catch (apiError) {
        console.log('CMS API not available, using Supabase session directly:', apiError);
      }

      // Fallback: Use Supabase session data directly
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

      localStorage.setItem('clientToken', session.access_token);
      localStorage.setItem('clientData', JSON.stringify(clientData));
      window.dispatchEvent(new Event('storage'));

      setStatus('success');
      setMessage('Sign-in successful! Redirecting to dashboard...');

      setTimeout(() => {
        router.push('/client/dashboard');
      }, 1500);
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Signing You In
            </h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome!
            </h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sign-In Failed
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/client/login')}
                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
              >
                Back to Login
              </button>
              <button
                onClick={() => router.push('/client/register')}
                className="w-full py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Create an Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
