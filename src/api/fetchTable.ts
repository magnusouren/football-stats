const BASE_URL = '/api';

export const fetchTable = async (
  competitionId: string,
  year: number,
  CL?: boolean
) => {
  let response;
  if (CL) {
    // CL is a boolean - quick fix for the Champions League
    response = await fetch(
      `${BASE_URL}/competitions/${competitionId}/standings`
    );
  } else {
    response = await fetch(
      `${BASE_URL}/competitions/${competitionId}/standings?season=${year}`
    );
  }
  const data = await response.json();

  return data;
};
