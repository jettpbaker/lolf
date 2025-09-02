'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'raster-react';
import Link from 'next/link';

export default function Chat({ championId }: { championId: string }) {
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ body: { champion: championId } }),
    async onToolCall({ toolCall }) {
      if (toolCall.dynamic) return;

      if (toolCall.toolName === 'endGame') {
        console.log('endGame tool call');
        // TODO: Show Confetti
      }
    },
  });

  const lastMessageRole = messages.length
    ? messages[messages.length - 1]?.role
    : undefined;

  const isThinking =
    (status === 'submitted' || status === 'streaming') &&
    lastMessageRole === 'user';

  return (
    <div className='flex flex-col w-full max-w-2xl mx-auto h-[80vh] border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'>
      <div className='px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 font-mono text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-400'>
        Chat Terminal
      </div>

      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-3'>
        {messages.map((message) =>
          message.role === 'user' ? (
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
                  );
                }
                return null;
              })}
            </div>
          ) : (
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
                  );
                }

                if (part.type === 'reasoning') {
                  return (
                    <div
                      key={`${message.id}-reasoning`}
                      className='flex justify-start bg-zinc-800 text-red-600 dark:text-red-400 w-fit whitespace-pre-wrap text-sm px-3 py-2 shadow-sm rounded-none'
                    >
                      {part.text}
                    </div>
                  );
                }

                if (part.type === 'tool-endGame') {
                  return (
                    <div
                      key={`${message.id}-tool-call`}
                      className='flex justify-start gap-1 opacity-65 mt-1'
                    >
                      <CheckIcon /> You've won! Check out your best run on
                      the&nbsp;
                      <Link href='/leaderboard' className='underline'>
                        leaderboard
                      </Link>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ),
        )}
        {isThinking && (
          <div className='flex justify-start'>
            <div className='w-fit whitespace-pre-wrap text-sm px-3 py-2 shadow-sm rounded-none bg-zinc-800 text-zinc-100 '>
              thinking
              <span className='retro-cursor' aria-hidden>
                █
              </span>
            </div>
          </div>
        )}
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
          className='rounded-none text-xs uppercase tracking-widest'
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
