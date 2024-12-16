import { DetailedTeam } from '@/types';
const BASE_URL = '/api';

export const fetchTeam = async (teamId: string): Promise<DetailedTeam> => {
  const response = await fetch(`${BASE_URL}/teams/${teamId}`);
  const data = await response.json();

  return data;
};
