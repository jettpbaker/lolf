import GameHeader from '@/components/game-header'

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full flex flex-col'>
      <GameHeader />
      <main className='flex-grow my-10'>{children}</main>
    </div>
  )
}
