'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Chat({ championId }: { championId: string }) {
  const [input, setInput] = useState('');
  const transport = useMemo(
    () => new DefaultChatTransport({ body: { champion: championId } }),
    [championId],
  );
  const { messages, sendMessage, status } = useChat({ transport });
  const endRef = useRef<HTMLDivElement>(null);
  const lastMessageId = messages.length
    ? messages[messages.length - 1]?.id
    : undefined;
  const lastMessageRole = messages.length
    ? messages[messages.length - 1]?.role
    : undefined;
  const isThinking =
    (status === 'submitted' || status === 'streaming') &&
    lastMessageRole === 'user';

  useEffect(() => {
    // Auto-scroll to the latest message when a new one arrives
    if (!lastMessageId) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [lastMessageId]);
  return (
    <div className='flex flex-col w-full max-w-2xl mx-auto h-[80vh] border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'>
      <div className='px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 font-mono text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-400'>
        Chat Terminal
      </div>

      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-3'>
        {messages.map((message) => {
          const isUser = message.role === 'user';
          const textParts = message.parts.filter((p) => {
            return (
              p.type === 'text' &&
              typeof (p as { type: 'text'; text?: string }).text === 'string' &&
              (p as { type: 'text'; text?: string }).text &&
              (p as { type: 'text'; text: string }).text.length > 0
            );
          }) as Array<{ type: 'text'; text: string }>;
          if (textParts.length === 0) {
            // Hide non-text (thinking/tool) parts entirely
            return null;
          }
          return (
            <div
              key={message.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap font-mono text-sm px-3 py-2 border shadow-sm rounded-none ${
                  isUser
                    ? 'bg-zinc-200 text-zinc-900 border-zinc-500'
                    : 'bg-zinc-800 text-zinc-100 border-zinc-600'
                }`}
              >
                {textParts.map((part, i) => (
                  <div key={`${message.id}-${i}`}>{part.text}</div>
                ))}
              </div>
            </div>
          );
        })}
        {isThinking && (
          <div className='flex justify-start'>
            <div className='max-w-[80%] whitespace-pre-wrap font-mono text-sm px-3 py-2 border shadow-sm rounded-none bg-zinc-800 text-zinc-100 border-zinc-600'>
              thinking
              <span className='retro-cursor' aria-hidden>
                █
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput('');
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
          className='rounded-none font-mono text-xs uppercase tracking-widest'
          disabled={!input.trim()}
        >
          Send
        </Button>
      </form>
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
  );
}
