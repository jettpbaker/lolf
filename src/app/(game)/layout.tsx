import GameHeader from '@/components/game-header'

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full max-h-full flex flex-col'>
      <GameHeader />
      <div className='flex-grow flex min-h-0'>
        <main className='flex-grow flex my-10'>{children}</main>
      </div>
    </div>
  )
}
