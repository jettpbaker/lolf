'use client'

import AIChatMessage from './ai-chat-message'
import UserChatMessage from './user-chat-message'
import type { UIMessage } from 'ai'
import { useEffect } from 'react'

export default function ChatMessageList({
  messages,
  debug,
}: {
  messages: UIMessage[]
  debug: boolean
}) {
  const latestMessage = messages[messages.length - 1]

  useEffect(() => {
    if (!latestMessage) return
    console.log('latestMessage', latestMessage)
    const message = document.getElementById(latestMessage.id)
    console.log('message', message)
    if (!message) return

    message.scrollIntoView({ behavior: 'smooth' })
  }, [latestMessage])

  return (
    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-3'>
      {messages.map((message) =>
        message.role === 'user' ? (
          <UserChatMessage key={message.id} message={message} />
        ) : (
          <AIChatMessage key={message.id} message={message} debug={debug} />
        ),
      )}
    </div>
  )
}
