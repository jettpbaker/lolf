'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/utils/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Sign out</h1>
        <p className='text-muted-foreground mb-6'>
          Click the button below to sign out.
        </p>
        <Button onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? 'Signing out…' : 'Sign out'}
        </Button>
      </div>
    </div>
  );
}
