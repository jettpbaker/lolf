import selectRandomChampionId from '@/utils/select-random-champion';

export default async function Play() {
  const id = await selectRandomChampionId();
  if (!id) return <div>No champion found</div>;

  return (
    <div>
      Play
      <p>Selected Champion: {id}</p>
    </div>
  );
}
