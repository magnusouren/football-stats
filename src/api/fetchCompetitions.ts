const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCompetitions = async () => {
  const response = await fetch(`${BASE_URL}/competitions/`, {
    headers: {
      'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
    },
  });
  const data = await response.json();

  const filteredData = data.competitions.filter(
    (competition: { plan: string }) => competition.plan === 'TIER_ONE'
  );

  return filteredData;
};
