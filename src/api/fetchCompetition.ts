import { Competition } from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCompetition = async (
  competitionId: string
): Promise<Competition> => {
  const response = await fetch(`${BASE_URL}/competitions/${competitionId}`, {
    headers: {
      'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};
