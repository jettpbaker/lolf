import GetStartedButton from './get-started-button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='h-full w-full flex items-center justify-center'>
      <div className='max-w-100 sm:mb-80 flex flex-col gap-6'>
        <h1 className='text-4xl font-bold'>lolf</h1>
        <p className=''>
          lolf is like combining guess who?, golf, league of legends, and
          prompting. Your task is to prompt your way to guessing the champion
          the model is thinking of. The less tokens used to guess the champion,
          the higher you rank.
        </p>
        <GetStartedButton />
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
