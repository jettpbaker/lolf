'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import ChatMessageList from './chat-message-list'
import ChatInput from './chat-input'
import { useSearchParams } from 'next/navigation'

export default function Chat({
  championId,
  championInfo,
}: {
  championId: string
  championInfo: object
}) {
  const searchParams = useSearchParams()
  const debug =
    (searchParams?.get('debug') ?? '').toLowerCase() === '1' ||
    (searchParams?.get('debug') ?? '').toLowerCase() === 'true'

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      body: { champion: championId, championInfo, debug },
    }),
    async onToolCall({ toolCall }) {
      if (toolCall.dynamic) return

      if (toolCall.toolName === 'endGame') {
        console.log('endGame tool call')
        // TODO: Show Confetti or something
      }
    },
  })

  return (
    <div className='flex flex-col w-full h-full border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'>
      <div className='px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 font-mono text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-400'>
        Chat Terminal
      </div>

      <ChatMessageList messages={messages} debug={debug} />

      <ChatInput
        onSend={(text: string) => sendMessage({ text })}
        status={status}
      />

      <style jsx>{`
        @keyframes retroBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .retro-cursor {
          display: inline-block;
          margin-left: 4px;
          width: 0.6ch;
          animation: retroBlink 1s steps(1, end) infinite;
        }
      `}</style>
    </div>
  )
}
