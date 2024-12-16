import { Competition } from '@/types';

const BASE_URL = '/api';

export const fetchCompetition = async (
  competitionId: string
): Promise<Competition> => {
  const response = await fetch(`${BASE_URL}/competitions/${competitionId}`);

  const data = await response.json();

  return data;
};
