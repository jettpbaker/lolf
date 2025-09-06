'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/utils/auth'

export async function getStarted() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) return redirect('/sign-in')
  return redirect('/p')
}

import db from '@/db'
import { game as gameTable } from '@/db/schema/game'
import { and, eq, asc, sql } from 'drizzle-orm'
import { user as userTable } from '@/db/schema/auth-schema'

export async function endGame({
  tokens,
}: {
  tokens: { input_tokens: number; output_tokens: number; total_tokens: number }
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) throw new Error('User not found')

  const gameRow = {
    userId: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    input_tokens: tokens.input_tokens,
    output_tokens: tokens.output_tokens,
    total_tokens: tokens.total_tokens,
  }

  const game = await db.insert(gameTable).values(gameRow).returning()
  console.log('game', game)
  return game
}

import { connection } from 'next/server'

export async function getGames() {
  await connection() // Makes dynamic

  const subquery = db
    .select({
      id: gameTable.id,
      userId: gameTable.userId,
      userName: userTable.name,
      input_tokens: gameTable.input_tokens,
      output_tokens: gameTable.output_tokens,
      total_tokens: gameTable.total_tokens,
      rowNum:
        sql<number>`ROW_NUMBER() OVER (PARTITION BY ${gameTable.userId} ORDER BY ${gameTable.total_tokens} ASC)`.as(
          'row_num',
        ),
    })
    .from(gameTable)
    .leftJoin(userTable, eq(gameTable.userId, userTable.id))
    .as('ranked_games')

  const games = await db
    .select({
      id: subquery.id,
      userName: subquery.userName,
      input_tokens: subquery.input_tokens,
      output_tokens: subquery.output_tokens,
      total_tokens: subquery.total_tokens,
    })
    .from(subquery)
    .where(sql`${subquery.rowNum} = 1`)
    .orderBy(asc(subquery.total_tokens))
  return games
}
