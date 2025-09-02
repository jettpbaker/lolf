'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';

export async function getStarted() {
  console.log('Hello!');

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect('/sign-in');
  return redirect('/p');
}

import db from '@/db';
import { game as gameTable } from '@/db/schema/game';

export async function createGame(guess: string, champion: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('User not found');

  if (guess !== champion) {
    throw new Error('Guess does not match champion');
  }

  const gameRow = {
    userId: session.user.id,
    attempts: 0,
    input_tokens: 10,
    output_tokens: 10,
    total_tokens: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const game = await db.insert(gameTable).values(gameRow);

  return game;
}
