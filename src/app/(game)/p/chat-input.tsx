'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ChatInput({
  onSend,
  status,
  gameWon,
}: {
  onSend: (text: string) => void
  status: string
  gameWon: boolean
}) {
  const [input, setInput] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!input.trim()) return
        onSend(input)
        setInput('')
      }}
      className='border-t border-zinc-300 dark:border-zinc-800 p-3 flex items-center gap-2'
    >
      <input
        className='flex-1 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-3 py-2 border border-zinc-400 dark:border-zinc-700 rounded-none outline-none focus:ring-0 focus:border-zinc-600 font-mono text-sm'
        value={input}
        placeholder='Type your message...'
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <Button
        type='submit'
        className='rounded-none text-xs uppercase tracking-widest'
        disabled={!input.trim() || status !== 'ready' || gameWon}
      >
        Send
      </Button>
    </form>
  )
}
