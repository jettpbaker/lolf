'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/utils/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PixelBounceLoader from '@/components/pixel-bounce-loader';

export default function SignOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setErrorMessage(message);
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
          {isLoading ? (
            <PixelBounceLoader className='dark:text-black text-white translate-y-[-4px]' />
          ) : (
            'Sign out'
          )}
        </Button>
        {errorMessage && (
          <p className='text-red-500 mt-4'>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
