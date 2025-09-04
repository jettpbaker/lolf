import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getGames } from '@/server/actions'

export default async function LeaderboardPage() {
  const games = await getGames()

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
                <TableCell className='font-medium'>{g.userName}</TableCell>
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
