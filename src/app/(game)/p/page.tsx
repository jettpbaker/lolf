import selectRandomChampionId from '@/utils/select-random-champion'
import ChatWindow from './chat-window'
import getChampion from '@/utils/get-champion'
import { auth } from '@/utils/auth'
import { headers } from 'next/headers'
import { createGame } from '@/server/actions'

export default async function Play() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) return <div>Please log in to play</div>

  const id = await selectRandomChampionId()
  if (!id) return <div>No champion found</div>

  const championPromise = getChampion(id)
  const gamePromise = createGame(session.user.id)

  const [champion, game] = await Promise.all([championPromise, gamePromise])
  if (!champion) return <div>No champion found</div>
  if (!game) return <div>Failed to create game :C</div>

  return (
    <div>
      <ChatWindow championId={id} championInfo={champion} />
    </div>
  )
}
