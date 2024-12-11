export const fetchTable = async (
  competitionId: string,
  year: number,
  CL?: boolean
) => {
  let response;
  if (CL) {
    // CL is a boolean - quick fix for the Champions League
    response = await fetch(`/api/competitions/${competitionId}/standings`, {
      headers: {
        'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
      },
    });
  } else {
    response = await fetch(
      `/api/competitions/${competitionId}/standings?season=${year}`,
      {
        headers: {
          'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
        },
      }
    );
  }
  const data = await response.json();

  return data;
};
