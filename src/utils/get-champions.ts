'use cache';

import { unstable_cacheLife } from 'next/cache';

export default async function getAllChampions() {
  unstable_cacheLife('forever');

  const response = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/15.17.1/data/en_US/champion.json',
  );
  const data = await response.json();

  const championsArray = Object.values(data.data);
  return championsArray;
}
