'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useMemo, useState } from 'react';

export default function Chat({ championId }: { championId: string }) {
  const [input, setInput] = useState('');
  const transport = useMemo(
    () => new DefaultChatTransport({ body: { champion: championId } }),
    [championId],
  );
  const { messages, sendMessage } = useChat({ transport });
  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      {messages.map((message) => (
        <div key={message.id} className='whitespace-pre-wrap'>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
              case 'tool-weather':
                return (
                  <pre key={`${message.id}-${i}`}>
                    {JSON.stringify(part, null, 2)}
                  </pre>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className='fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
