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
            <TableRow className="">
              <TableHead>Time</TableHead>
              <TableHead className="hidden md:table-cell">Home</TableHead>
              <TableHead className="hidden md:table-cell">Away</TableHead>
              <TableHead className="table-cell md:hidden">Standing</TableHead>
              <TableHead className="hidden md:table-cell">Score</TableHead>
              <TableHead className="hidden md:table-cell">Tournament</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((match) => (
              <TableRow
                key={match.id}
                className="odd:bg-secondary"
                tabIndex={0}
              >
                <TableCell className="">
                  <div className="flex gap-x-2 gap-y-0.5 flex-col md:flex-row">
                    {new Date(match.utcDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    <div className="hidden md:block">
                      {match.status === MatchStatus.IN_PLAY && (
                        <div className="bg-green-500 rounded-md px-1 py-0.5 text-xs text-white">
                          Live
                        </div>
                      )}
                      {match.status === MatchStatus.PAUSED && (
                        <div className="bg-yellow-600 rounded-md px-1 py-0.5 text-xs text-white">
                          Pause
                        </div>
                      )}
                      {match.status === MatchStatus.FINISHED && (
                        <div className="bg-gray-300 rounded-md px-1 py-0.5 text-xs">
                          Done
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      className="w-5 h-5 self-center"
                    />
                    <a
                      href={`/team/${match.homeTeam.id}`}
                      className="hover:underline hover:cursor-pointer"
                    >
                      {match.homeTeam.shortName}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      className="w-5 h-5 self-center"
                    />
                    <a
                      href={`/team/${match.awayTeam.id}`}
                      className="hover:underline hover:cursor-pointer"
                    >
                      {match.awayTeam.shortName}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
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
                <TableCell className="hidden md:table-cell">
                  <a
                    href={'/competition/' + match.competition.id}
                    className="hover:underline hidden md:inline-block"
                  >
                    {match.competition.name}
                  </a>
                </TableCell>
                <TableCell className="table-cell md:hidden">
                  <div className="flex gap-4">
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          {match.score.fullTime.home !== null ? (
                            <p
                              className={`bg-popover p-1 rounded-t-full text-popover-foreground border-t border-r border-l`}
                            >
                              {match.score.fullTime.home}
                            </p>
                          ) : (
                            <p className="mb-2 p-1 ml-0.5 text-center">-</p>
                          )}
                          {match.score.fullTime.away !== null ? (
                            <p className="bg-popover p-1 rounded-b-full text-popover-foreground border-b border-r border-l">
                              {match.score.fullTime.away}
                            </p>
                          ) : (
                            <p className="p-1 ml-0.5">-</p>
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Updated:{' '}
                            {new Date(match.lastUpdated).toLocaleTimeString()}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={match.homeTeam.crest}
                          alt={match.homeTeam.name}
                          className="w-5 h-5 self-center"
                        />
                        <a
                          href={`/team/${match.homeTeam.id}`}
                          className="hover:underline hover:cursor-pointer"
                        >
                          {match.homeTeam.shortName}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={match.awayTeam.crest}
                          alt={match.awayTeam.name}
                          className="w-5 h-5 self-center"
                        />
                        <a
                          href={`/team/${match.awayTeam.id}`}
                          className="hover:underline hover:cursor-pointer"
                        >
                          {match.awayTeam.shortName}
                        </a>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <a href={'/competition/' + match.competition.id}>
                    <img
                      src={match.competition.emblem}
                      alt={match.competition.name}
                      className="h-8 m-auto hover:cursor-pointer"
                    />
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
