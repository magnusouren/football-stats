import { fetchTable } from '@/api/fetchTable';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { DetailedCompetition } from '@/types';
import { DetailedTable } from './DetailedTable';

interface LeagueTableProps {
  competitionId: string;
  season: string;
}

export const LeagueTable: React.FC<LeagueTableProps> = ({
  competitionId,
  season,
}) => {
  const intSeason = parseInt(season);

  const { data, error, isLoading } = useQuery<DetailedCompetition>({
    queryKey: ['table', competitionId, intSeason],
    queryFn: () => fetchTable(competitionId, intSeason),
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mt-8">
        Table for the {season} season
      </h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong {error.message}</p>}
      {data && data.standings.length === 0 && <p>No data available</p>}
      {data && data.standings.length > 0 && (
        <DetailedTable
          data={data.standings[0].table}
          competitionId={competitionId}
          name={data.standings[0].group}
        />
      )}
    </div>
  );
};
