import PixelBounceLoader from '@/components/pixel-bounce-loader'

export default function LoadingShowcase() {
  return (
    <main className='min-h-screen w-screen flex flex-col items-center justify-center gap-10 p-6'>
      <h1 className='text-3xl font-bold'>Loading</h1>
      <PixelBounceLoader />
    </main>
  )
}
