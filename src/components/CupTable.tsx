import { DetailedCompetition } from '@/types';
import { DetailedTable } from './DetailedTable';
import { fetchTable } from '@/api/fetchTable';
import { useQuery } from '@tanstack/react-query';

interface CupTableProps {
  season: string;
  competitionId: string;
}

export const CupTable: React.FC<CupTableProps> = ({
  season,
  competitionId,
}) => {
  const intSeason = parseInt(season);

  const { data, error, isLoading } = useQuery<DetailedCompetition>({
    queryKey: ['table', competitionId, intSeason],
    queryFn: () => fetchTable(competitionId, intSeason, true),
  });

  console.log(data);

  return (
    <div>
      <h2 className="text-xl font-semibold mt-8">{season}</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong {error.message}</p>}
      {data &&
        data.standings.length > 0 &&
        data.standings.map((standing) => (
          <div key={standing.group}>
            <h3 className="text-lg font-semibold mt-8">
              {standing.group} - {standing.stage}
            </h3>
            <DetailedTable
              key={standing.group}
              data={standing.table}
              competitionId={competitionId}
              name={standing.group}
            />
          </div>
        ))}
    </div>
  );
};
