import { getStarted } from '@/server/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='h-screen w-screen flex items-center justify-center'>
      <div className='max-w-1/2 mb-80 flex flex-col gap-6'>
        <h1 className='text-4xl font-bold'>lolf</h1>
        <p className=''>
          lolf is like combining guess who?, golf, league of legends, and
          prompting. Your task is to prompt your way to guessing the champion
          the model is thinking of. The less tokens used to guess the champion,
          the higher you rank.
        </p>
        <form action={getStarted}>
          <Button type='submit' variant='default' className='cursor-pointer'>
            Get Started
          </Button>
        </form>
        <p>
          Or check out the{' '}
          <Link href='/l' className='underline'>
            leaderboard
          </Link>
        </p>
      </div>
    </main>
  )
}
