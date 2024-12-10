export const fetchTable = async (competitionId: string, year: number) => {
  const response = await fetch(
    `/api/competitions/${competitionId}/standings?season=${year}`,
    {
      headers: {
        'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  const data = await response.json();

  return data.standings[0].table;
};
