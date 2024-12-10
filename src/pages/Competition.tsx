import { fetchCompetition } from '@/api/fetchCompetition';
import { LeagueTable } from '@/components/LeagueTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Competition } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Competition() {
  const { competitionId } = useParams<{ competitionId: string }>();

  const { data, error, isLoading } = useQuery<Competition | null>({
    queryKey: ['competition', competitionId],
    queryFn: () => {
      if (!competitionId) return null;
      return fetchCompetition(competitionId);
    },
  });

  const [selectedSeason, setSelectedSeason] = useState<string>('');

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data)
    return (
      <div>
        {/* <img src={data.emblem} alt={data.name} className="w-48" /> */}
        <h1 className="text-2xl font-bold mb-4">
          {data.name} ({data.code})
        </h1>
        <Select onValueChange={(value) => setSelectedSeason(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Season" />
          </SelectTrigger>
          <SelectContent>
            {data.seasons &&
              data.seasons.map((season) => (
                <SelectItem
                  value={
                    season.startDate.toString().split('-')[0] +
                    '-' +
                    season.endDate.toString().split('-')[0]
                  }
                  key={season.id}
                >
                  {season.startDate.toString().split('-')[0]} -{' '}
                  {season.endDate.toString().split('-')[0]}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {selectedSeason && competitionId && (
          <LeagueTable season={selectedSeason} competitionId={competitionId} />
        )}
      </div>
    );

  return <h1>Error</h1>;
}
