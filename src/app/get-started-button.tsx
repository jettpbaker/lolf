'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { authClient } from '@/utils/auth-client'
import PixelBounceLoader from '@/components/pixel-bounce-loader'

export default function GetStartedButton() {
  const router = useRouter()
  const { data: session, isPending, error, refetch } = authClient.useSession()

  const handleClick = () => {
    if (session) {
      router.push('/p')
    } else {
      router.push('/sign-in')
    }
  }
  return (
    <>
      <Button onClick={handleClick} disabled={isPending}>
        {isPending ? (
          <PixelBounceLoader className='dark:text-black text-white translate-y-[-4px]' />
        ) : (
          'Get Started'
        )}
      </Button>

      {error && (
        <p className='text-red-500 mt-[-1rem]'>Something went wrong :c</p>
      )}
    </>
  )
}
