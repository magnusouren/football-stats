import { fetchTable } from '@/api/fetchTable';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { TableInstance } from '@/types';

interface LeagueTableProps {
  competitionId: string;
  season: string;
}

export const LeagueTable: React.FC<LeagueTableProps> = ({
  competitionId,
  season,
}) => {
  const intSeason = parseInt(season.split('-')[0]);

  const { data, error, isLoading } = useQuery<TableInstance[]>({
    queryKey: ['table', competitionId, intSeason],
    queryFn: () => fetchTable(competitionId, intSeason),
  });

  console.log(data);

  return (
    <div>
      <h2 className="text-xl font-semibold mt-8">Table for {season}</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong {error.message}</p>}
      <Table>
        <TableCaption>League Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Played</TableHead>
            <TableHead>Won</TableHead>
            <TableHead>Draw</TableHead>
            <TableHead>Lost</TableHead>
            <TableHead>Difference</TableHead>
            <TableHead>Scored</TableHead>
            <TableHead>Conceded</TableHead>
            <TableHead>Form</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((team) => (
            <TableRow key={team.team.id}>
              <TableCell>{team.position}</TableCell>
              <TableCell>{team.team.name}</TableCell>
              <TableCell>{team.points}</TableCell>
              <TableCell>{team.playedGames}</TableCell>
              <TableCell>{team.won}</TableCell>
              <TableCell>{team.draw}</TableCell>
              <TableCell>{team.lost}</TableCell>
              <TableCell>{team.goalDifference}</TableCell>
              <TableCell>{team.goalsFor}</TableCell>
              <TableCell>{team.goalsAgainst}</TableCell>
              <TableCell>
                {team.form.split(',').map((result, index) => (
                  <span key={index} className="mx-1">
                    {result}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
