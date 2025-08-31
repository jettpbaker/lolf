import getAllChampions from './get-champions';

export default async function selectRandomChampionId() {
  const champions = await getAllChampions();
  const randomChampion = champions[
    Math.floor(Math.random() * champions.length)
  ] as { id: string };

  if (!randomChampion.id) return null;
  return randomChampion.id;
}
