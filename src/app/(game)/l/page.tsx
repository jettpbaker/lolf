import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { GameType } from '@/db/schema/game'

function makeMockGames(count: number): GameType[] {
  const items: GameType[] = []
  for (let i = 0; i < count; i++) {
    const input = 200 + Math.floor(Math.random() * 250)
    const output = 200 + Math.floor(Math.random() * 900)
    const total = input + output
    const now = new Date()
    items.push({
      id: i + 1,
      userId: `user_${i + 1}`,
      input_tokens: input,
      output_tokens: output,
      total_tokens: total,
      completed: true,
      createdAt: now,
      updatedAt: now,
    })
  }
  items.sort((a, b) => (a.total_tokens ?? 0) - (b.total_tokens ?? 0))
  return items
}

export default async function LeaderboardPage() {
  const games = makeMockGames(25)

  return (
    <section className='space-y-4'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Leaderboard</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-16'>Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className='text-right'>Input Tokens</TableHead>
            <TableHead className='text-right'>Output Tokens</TableHead>
            <TableHead className='text-right'>Total tokens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((g, idx) => {
            const rank = idx + 1
            return (
              <TableRow key={g.id}>
                <TableCell className='font-medium tabular-nums'>
                  {rank}
                </TableCell>
                <TableCell className='font-medium'>{g.userId}</TableCell>
                <TableCell className='text-right tabular-nums'>
                  {g.input_tokens}
                </TableCell>
                <TableCell className='text-right tabular-nums'>
                  {g.output_tokens}
                </TableCell>
                <TableCell className='text-right font-semibold tabular-nums'>
                  {g.total_tokens}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
