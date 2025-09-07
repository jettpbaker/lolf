'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/utils/auth-client'
import { Button } from '@/components/ui/button'
import PixelBounceLoader from '@/components/pixel-bounce-loader'

export default function SignOutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push('/sign-in')
            },
          },
        })
      } catch (error) {
        console.error('Sign out error:', error)
      }
    })
  }

  return (
    <Button
      variant='destructive'
      onClick={handleSignOut}
      disabled={isPending}
      className='w-fit'
    >
      {isPending ? (
        <PixelBounceLoader className='translate-y-[-4px]' />
      ) : (
        'Sign Out'
      )}
    </Button>
  )
}
