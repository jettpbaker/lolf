import { Suspense } from 'react'
import LeaderboardTable from './leaderboard-table'
import PixelBounceLoader from '@/components/pixel-bounce-loader'

export default async function LeaderboardPage() {
  return (
    <section className='space-y-4'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Leaderboard</h1>
      </div>

      <Suspense fallback={<PixelBounceLoader />}>
        <LeaderboardTable />
      </Suspense>
    </section>
  )
}
