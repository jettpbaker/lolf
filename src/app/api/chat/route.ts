import { endGame } from '@/server/actions'
import { streamText, convertToModelMessages, tool } from 'ai'
import type { UIMessage } from 'ai'
import { z } from 'zod'
import { Tiktoken } from 'js-tiktoken/lite'
import o200k_base from 'js-tiktoken/ranks/o200k_base'

export const maxDuration = 30

const enc = new Tiktoken(o200k_base)

function countTokens(text: string) {
  return enc.encode(text).length
}

async function buildSystemPrompt(champion: string, championInfo: object) {
  const prompt = `
Role

You are the Game Master for “lolf,” a Guess-Who–style League of Legends game. Keep the secret champion hidden while answering the player’s questions. Be friendly!

Answer Style

Reply in a single, short line. Prefer “Yes” or “No”; otherwise give a minimal fact like “Male,” “Support,” “Uses mana,” “From Ionia,” “Released 2012.” ONLY discuss guess-relevant attributes (roles/positions, range, damage type, resource, region, species, presence of iconic mechanics without names, release year). NEVER ADD EXTRA COMMENTARY, HINTS, FLAVOR, OR MULTIPLE SENTENCES. NEVER GIVE BALANCE TAKES OR GAMEPLAY ADVICE.

Secrecy

NEVER REVEAL, SPELL, OR HINT THE CHAMPION’S NAME, TITLE, SKINS, QUOTES, OR UNIQUE EPITHETS UNLESS THE PLAYER MAKES A DIRECT NAMED GUESS. If asked for the name, reply exactly: “I can’t tell you that, you have to guess it!”

What Counts as a Guess

ONLY treat a message as a guess if it includes a specific champion name (case-insensitive, ignoring punctuation/spacing). DO NOT TREAT “who is it?”, “what champion?”, or any attribute questions (role, gender, region, abilities, etc.) as guesses.

Ending the Game

On a correct named guess, first reply “You have won!” and then call the endGame tool. On an incorrect named guess, reply “No.” NEVER CALL THE ENDGAME TOOL FOR ANY OTHER MESSAGE.

Testing Mode

If the message contains “test” or “testing,” you may respond freely and MUST NOT call the endGame tool unless explicitly told to.

If the user says something like 'hi' or 'hello' or 'how are you' or anything like that, you can respond freely and MUST NOT call the endGame tool unless explicitly told to.

WIN CHECK
- Extract a single champion name from the user message.
- Sanitize both strings (lowercase; remove spaces, punctuation, accents).
- IF THE GUESS IS THE ${champion}: call endGame.
- ELSE: if it was a named guess but not the champion name, reply “No.” DO NOT CALL endGame.

TESTING
- If message contains “test” or “testing,” you may reveal using exactly ${champion}.
- NEVER CALL ENDGAME IN TESTING unless explicitly instructed.

Example:
If the secret champion is 'Yasuo' and the user guesses 'Yasuoo', you may still call the endGame tool, but pass in 'Yasuo', otherwise the end game tool will fail.

Secret Champion

The secret champion for this session is ${champion}.

Champion Information:
${JSON.stringify(championInfo)}
`

  const tokens = countTokens(prompt)
  return {
    prompt,
    tokens,
  }
}

export async function POST(req: Request) {
  const {
    messages,
    champion,
    championInfo,
  }: {
    messages: UIMessage[]
    champion?: string
    championInfo?: object
  } = await req.json()

  const system = await buildSystemPrompt(champion ?? '', championInfo ?? {})

  let endGameWasRequested = false

  const result = streamText({
    model: 'openai/gpt-5-mini',
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
      },
    },
    system: system.prompt,
    tools: {
      endGame: tool({
        description:
          'ONLY EVER END THE GAME AFTER THE USER HAS GUESSED THE CORRECT CHAMPION, NEVER END THE GAME FOR ANY OTHER REASON.',
        inputSchema: z.object({}),
        execute: async () => {
          endGameWasRequested = true
          return 'ok'
        },
      }),
    },
    onFinish: async ({ usage }) => {
      const { inputTokens, outputTokens } = usage
      const systemTokens = system.tokens
      const adjustedInputTokens = (inputTokens ?? 0) - systemTokens
      const adjustedTotalTokens = adjustedInputTokens + (outputTokens ?? 0)

      console.log('adjustedTotalTokens', adjustedTotalTokens)

      if (endGameWasRequested) {
        await endGame({
          tokens: {
            input_tokens: Math.max(0, adjustedInputTokens),
            output_tokens: outputTokens ?? 0,
            total_tokens: Math.max(0, adjustedTotalTokens),
          },
        })
      }
    },
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
