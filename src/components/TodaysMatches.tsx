import { fetchTodaysMatches } from '@/api/fetchTodaysMatches';
import { Match, MatchStatus } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const TodaysMatches: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Match[]>({
    queryKey: ['todaysMatches'],
    queryFn: fetchTodaysMatches,
  });

  data?.sort((a, b) => {
    const timeDiff =
      new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();

    if (timeDiff == 0) {
      if (
        a.competition.name === 'Premier League' ||
        a.competition.name === 'UEFA Champions League'
      )
        return -1;
      if (
        b.competition.name === 'Premier League' ||
        b.competition.name === 'UEFA Champions League'
      )
        return 1;

      return a.competition.name.localeCompare(b.competition.name);
    }

    return timeDiff;
  });

  return (
    <div className="w-full">
      <h2 className="mt-12 font-semibold text-xl mb-4">Todays matches</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data && (
        <Table>
          <TableCaption>Todays matches</TableCaption>
          <TableHeader>
            <TableRow className="bg-accent text-accent-foreground">
              <TableHead>Time</TableHead>
              <TableHead>Home</TableHead>
              <TableHead>Away</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Tournament</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((match) => (
              <TableRow
                key={match.id}
                className="even:bg-secondary"
                tabIndex={0}
              >
                <TableCell>
                  {new Date(match.utcDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {match.status === MatchStatus.IN_PLAY && (
                    <span className="ml-2 bg-green-500 rounded-md px-1 py-0.5 text-xs text-white">
                      Live
                    </span>
                  )}
                  {match.status === MatchStatus.PAUSED && (
                    <span className="ml-2 bg-yellow-600 rounded-md px-1 py-0.5 text-xs text-white">
                      Pause
                    </span>
                  )}
                  {match.status === MatchStatus.FINISHED && (
                    <span className="ml-2 bg-gray-300 rounded-md px-1 py-0.5 text-xs">
                      Done
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={'/team/' + match.homeTeam.id}
                    className="hover:underline"
                  >
                    {match.homeTeam.shortName}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={'/team/' + match.awayTeam.id}
                    className="hover:underline"
                  >
                    {match.awayTeam.shortName}
                  </a>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      {' '}
                      {match.score.fullTime.home !== null &&
                      match.score.fullTime.away !== null
                        ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                        : '-'}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Updated:{''}
                        {new Date(match.lastUpdated).toLocaleTimeString()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <a
                    href={'/competition/' + match.competition.id}
                    className="hover:underline"
                  >
                    {match.competition.name}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
