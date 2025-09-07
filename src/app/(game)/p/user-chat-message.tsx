'use client'

import type { UIMessage } from 'ai'

export default function UserChatMessage({ message }: { message: UIMessage }) {
  return (
    <div key={message.id} className='flex justify-end'>
      {message.parts.map((part) => {
        if (part.type === 'text') {
          return (
            <div
              key={`${message.id}-text`}
              className='bg-zinc-300 text-zinc-900 w-fit whitespace-pre-wrap text-sm px-3 py-2 shadow-sm rounded-none'
            >
              {part.text}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
