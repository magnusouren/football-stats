import { DetailedTeam } from '@/types';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchTeam = async (teamId: string): Promise<DetailedTeam> => {
  const response = await fetch(`${BASE_URL}/teams/${teamId}`, {
    headers: {
      'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};
