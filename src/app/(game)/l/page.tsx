import { Suspense } from 'react'
import LeaderboardTable from './leaderboard-table'
import PixelBounceLoader from '@/components/pixel-bounce-loader'

export default async function LeaderboardPage() {
  return (
    <section className='space-y-4 h-full'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Leaderboard</h1>
      </div>

      <Suspense
        fallback={
          <div className='flex items-center justify-center h-[80%] w-full'>
            <PixelBounceLoader className='scale-300  mb-100' />
          </div>
        }
      >
        <LeaderboardTable />
      </Suspense>
    </section>
  )
}
