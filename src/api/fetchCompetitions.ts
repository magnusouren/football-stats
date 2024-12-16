const BASE_URL = '/api'; // Lokalt og i produksjon peker dette til serverless funksjonen

export const fetchCompetitions = async () => {
  const response = await fetch(`${BASE_URL}/competitions/`); // Ingen X-Auth-Token nødvendig i frontend
  const data = await response.json();

  const filteredData = data.competitions.filter(
    (competition: { plan: string }) => competition.plan === 'TIER_ONE'
  );

  return filteredData;
};
