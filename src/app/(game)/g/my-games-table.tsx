import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMyGames } from '@/server/actions'

export default async function MyGamesTable() {
  const games = await getMyGames()
  if (!games) return <div>No games found</div>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-16'>#</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className='text-right'>Input Tokens</TableHead>
          <TableHead className='text-right'>Output Tokens</TableHead>
          <TableHead className='text-right'>Total tokens</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((g, idx) => {
          const index = idx + 1
          const dateLabel = g.createdAt
            ? new Date(g.createdAt as unknown as string).toLocaleString()
            : ''
          return (
            <TableRow key={g.id}>
              <TableCell className='font-medium tabular-nums'>
                {index}
              </TableCell>
              <TableCell className='font-medium'>{dateLabel}</TableCell>
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
  )
}
