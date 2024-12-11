import { DetailedTeam } from '@/types';

export const fetchTeam = async (teamId: string): Promise<DetailedTeam> => {
  const response = await fetch(`/api/teams/${teamId}`, {
    headers: {
      'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
    },
  });
  const data = await response.json();

  console.log(data);

  return data;
};
