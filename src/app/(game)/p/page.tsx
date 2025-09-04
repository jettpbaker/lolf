import selectRandomChampionId from '@/utils/select-random-champion';
import ChatWindow from './chat-window';
import getChampion from '@/utils/get-champion';

export default async function Play() {
  const id = await selectRandomChampionId();
  if (!id) return <div>No champion found</div>;

  const champion = await getChampion(id);
  console.log(JSON.stringify(champion, null, 2));
  if (!champion) return <div>No champion found</div>;

  return (
    <div>
      <ChatWindow championId={id} championInfo={champion} />
    </div>
  );
}
