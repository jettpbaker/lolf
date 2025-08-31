import selectRandomChampionId from '@/utils/select-random-champion';
import ChatWindow from './chat-window';

export default async function Play() {
  const id = await selectRandomChampionId();
  if (!id) return <div>No champion found</div>;

  return (
    <div>
      Play
      <p>Selected Champion: {id}</p>
      <ChatWindow championId={id} />
    </div>
  );
}
