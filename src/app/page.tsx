import { getStarted } from '@/server/actions';
import { Button } from '@/components/ui/button';

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
        <div className='flex flex-col gap-3'>
          <h2 className='text-lg font-semibold'>Button variants</h2>
          <div className='flex flex-wrap items-center gap-3'>
            <Button>Default</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='link'>Link</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
