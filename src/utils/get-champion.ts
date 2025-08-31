export default async function getChampion(id: string) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/15.17.1/data/en_US/champion/${id}.json`,
  );
  const data = await response.json();
  return data;
}
