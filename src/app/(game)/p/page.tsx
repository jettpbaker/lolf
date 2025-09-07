import PixelBounceLoader from '@/components/pixel-bounce-loader'
import Chat from './chat'
import { Suspense } from 'react'

export default async function Play() {
  return (
    <Suspense fallback={<PixelBounceLoader />}>
      <Chat />
    </Suspense>
  )
}
