'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/utils/auth'

export async function getStarted() {
  console.log('Hello!')

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) return redirect('/sign-in')
  return redirect('/p')
}

import db from '@/db'
import { game as gameTable } from '@/db/schema/game'
import { eq } from 'drizzle-orm'

export async function createGame(userId: string) {
  const gameRow = {
    userId,
    attempts: 0,
    input_tokens: 10,
    output_tokens: 10,
    total_tokens: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const game = await db.insert(gameTable).values(gameRow)
  return game
}

export async function endGame({
  tokens,
}: {
  tokens: { input_tokens: number; output_tokens: number; total_tokens: number }
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) throw new Error('User not found')

  await db
    .update(gameTable)
    .set({
      input_tokens: tokens.input_tokens,
      output_tokens: tokens.output_tokens,
      total_tokens: tokens.total_tokens,
      completed: true,
    })
    .where(eq(gameTable.userId, session.user.id))
}
