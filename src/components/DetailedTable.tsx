import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from './ui/table';
import { TableInstance } from '@/types';

interface DetailedTableProps {
  data: TableInstance[];
  competitionId: string;
  name?: string;
}

const formatPosition = (position: number, competitionId: string) => {
  if (competitionId === 'PL' && position <= 4) {
    return 'border-l-4 border-l-blue-600';
  }
  if (competitionId === 'PL' && position == 5) {
    return 'border-l-4 border-l-green-500';
  }
  if (competitionId === 'PL' && position >= 18) {
    return 'border-l-4 border-l-red-500';
  }
  if (competitionId === 'CL' && position <= 8) {
    return 'border-l-4 border-l-blue-600';
  }
  if (competitionId === 'CL' && position <= 24 && position >= 9) {
    return 'border-l-4 border-l-orange-500';
  }

  return '';
};

export const DetailedTable: React.FC<DetailedTableProps> = ({
  data,
  competitionId,
  name,
}) => {
  return (
    <Table className="text-xs sm:text-sm mt-4">
      {name && <TableCaption>{name}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead className="w-2"></TableHead>
          <TableHead>Team</TableHead>

          <TableHead className="text-center border-l">
            <span className="hidden sm:inline">Played</span>
            <span className="sm:hidden">P</span>
          </TableHead>
          <TableHead className="text-center">
            <span className="hidden sm:inline">Won</span>
            <span className="sm:hidden">W</span>
          </TableHead>
          <TableHead className="text-center">
            <span className="hidden sm:inline">Draw</span>
            <span className="sm:hidden">D</span>
          </TableHead>
          <TableHead className="text-center border-r">
            <span className="hidden sm:inline">Lost</span>
            <span className="sm:hidden">L</span>
          </TableHead>
          <TableHead className="text-center">
            <span className="hidden sm:inline">Goals</span>
            <span className="sm:hidden">+/-</span>
          </TableHead>
          <TableHead className="text-center border-r">
            <span className="hidden sm:inline">Diff</span>
            <span className="sm:hidden">Diff.</span>
          </TableHead>
          {data[0].form && (
            <TableHead className="hidden sm:table-cell">Form</TableHead>
          )}
          <TableHead className="font-semibold border-r text-center">
            <span className="hidden sm:inline">Points</span>
            <span className="sm:hidden">P</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((team) => (
          <TableRow key={team.team.id} className={`even:bg-accent`}>
            <TableCell
              className={`${formatPosition(team.position, competitionId)} pr-0`}
            >
              {team.position}.
            </TableCell>
            <TableCell className="">
              <div className="flex items-center gap-2">
                <img
                  src={team.team.crest}
                  alt={team.team.name}
                  className="w-5 h-5 self-center"
                />
                <a
                  href={`/team/${team.team.id}`}
                  className="hover:underline hover:cursor-pointer"
                >
                  {team.team.shortName}
                </a>
              </div>
            </TableCell>

            <TableCell className="text-center border-l">
              {team.playedGames}
            </TableCell>
            <TableCell className="text-center">{team.won}</TableCell>
            <TableCell className="text-center">{team.draw}</TableCell>
            <TableCell className="text-center border-r">{team.lost}</TableCell>
            <TableCell className="text-center whitespace-nowrap">
              <span>{team.goalsFor}</span>
              <span className={'sm:px-1'}>-</span>
              <span>{team.goalsAgainst}</span>
            </TableCell>
            <TableCell className={`text-center border-r`}>
              {team.goalDifference}
            </TableCell>
            {team.form && (
              <TableCell className=" whitespace-nowrap hidden sm:block">
                {team.form
                  .split(',')
                  .reverse()
                  .map((result, index) => (
                    <span key={index} className={`mx-0.5`}>
                      {result === 'W' && '🟢'}
                      {result === 'L' && '🔴'}
                      {result === 'D' && '🟡'}
                    </span>
                  ))}
              </TableCell>
            )}
            <TableCell className="font-semibold border-r text-center">
              {team.points}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
