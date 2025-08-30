'use client';

import { authClient } from '@/utils/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      try {
        await authClient.signOut();
        router.push('/');
      } catch (error) {
        console.error('Sign out error:', error);
        router.push('/');
      }
    };

    signOut();
  }, [router]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Signing out...</h1>
        <p className='text-muted-foreground'>
          Please wait while we sign you out.
        </p>
      </div>
    </div>
  );
}
