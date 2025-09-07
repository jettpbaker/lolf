import selectRandomChampionId from '@/utils/select-random-champion'
import ChatWindow from './chat-window'
import getChampion from '@/utils/get-champion'
import { auth } from '@/utils/auth'
import { headers } from 'next/headers'

export default async function Chat() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) return <div>Please log in to play</div>

  const id = await selectRandomChampionId()
  if (!id) return <div>No champion found</div>

  const champion = await getChampion(id)
  if (!champion) return <div>No champion found</div>

  return (
    <div>
      <ChatWindow championId={id} championInfo={champion} />
    </div>
  )
}
