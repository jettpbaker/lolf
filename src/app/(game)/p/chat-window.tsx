'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import ChatMessageList from './chat-message-list'
import ChatInput from './chat-input'
import { useSearchParams } from 'next/navigation'
import ConfettiExplosion from 'react-confetti-explosion'
import { Toggle } from '@/components/ui/toggle'

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

  const [showConfetti, setShowConfetti] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [reasoning, setReasoning] = useState(false)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      body: { champion: championId, championInfo, debug, reasoning },
    }),
    async onToolCall({ toolCall }) {
      if (toolCall.dynamic) return

      if (toolCall.toolName === 'endGame') {
        setGameWon(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000)
      }
    },
  })

  const vh = typeof window !== 'undefined' ? window.innerHeight : 0

  return (
    <div className='flex flex-col w-full h-full border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'>
      <div className='px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 font-mono text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-400 flex items-center justify-between'>
        <span>Chat Terminal</span>
        <div className='flex items-center gap-2'>
          <span className='text-xs'>Reasoning</span>
          <Toggle
            pressed={reasoning}
            onPressedChange={setReasoning}
            variant='outline'
            size='sm'
          >
            {reasoning ? 'ON' : 'OFF'}
          </Toggle>
        </div>
      </div>

      <ChatMessageList messages={messages} debug={debug} />

      <ChatInput
        onSend={(text: string) => sendMessage({ text })}
        status={status}
        gameWon={gameWon}
      />

      {showConfetti && (
        <div className='pointer-events-none fixed inset-x-0 bottom-0 flex items-end justify-center z-50'>
          <ConfettiExplosion
            force={1.75}
            particleCount={750}
            duration={3000}
            particleSize={8}
            width={1500}
            height={vh}
          />
        </div>
      )}

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
