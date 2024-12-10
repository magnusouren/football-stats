import { Competition } from '@/types';

export const fetchCompetition = async (
  competitionId: string
): Promise<Competition> => {
  const response = await fetch(`/api/competitions/${competitionId}`, {
    headers: {
      'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};
