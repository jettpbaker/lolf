import PixelBounceLoader from '@/components/pixel-bounce-loader'
import Chat from './chat'
import { Suspense } from 'react'

export default async function Play() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center h-full w-full'>
          <PixelBounceLoader className='scale-300 mb-100' />
        </div>
      }
    >
      <Chat />
    </Suspense>
  )
}
