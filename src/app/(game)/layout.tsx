import GameHeader from '@/components/game-header';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='px-4'>
      <GameHeader />
      <main className='mx-auto max-w-screen-lg mt-6'>{children}</main>
    </div>
  );
}
