'use client'

import Link from 'next/link'
import { CheckIcon } from 'raster-react'
import type { UIMessage } from 'ai'

export default function AIChatMessage({
  message,
  debug,
}: {
  message: UIMessage
  debug: boolean
}) {
  return (
    <div key={message.id}>
      {message.parts.map((part) => {
        if (part.type === 'text') {
          return (
            <div
              key={`${message.id}-text`}
              className='flex justify-start bg-zinc-800 text-zinc-100 w-fit whitespace-pre-wrap text-sm px-3 py-2 shadow-sm rounded-none'
            >
              {part.text}
            </div>
          )
        }

        if (part.type === 'reasoning' && debug) {
          return (
            <div key={`${message.id}-reasoning`} className='flex justify-start'>
              <div className='w-fit whitespace-pre-wrap text-xs font-mono px-2 py-1 rounded-none text-zinc-600 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900'>
                [debug] {part.text}
              </div>
            </div>
          )
        }

        if (part.type === 'reasoning' && !debug && part.state !== 'done') {
          return (
            <div className='flex justify-start' key={`${message.id}-reasoning`}>
              <div className='w-fit whitespace-pre-wrap text-sm px-3 py-2 rounded-none text-zinc-800'>
                thinking
                <span className='retro-cursor' aria-hidden>
                  █
                </span>
              </div>
            </div>
          )
        }

        if (part.type === 'tool-endGame') {
          return (
            <div
              key={`${message.id}-tool-call`}
              className='flex justify-start gap-1 opacity-65 mt-1'
            >
              <CheckIcon /> You've won! Check out your best run on the&nbsp;
              <Link href='/l' prefetch={false} className='underline'>
                leaderboard
              </Link>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
