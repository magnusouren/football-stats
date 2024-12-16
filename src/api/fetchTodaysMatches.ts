const BASE_URL = '/api';

export const fetchTodaysMatches = async () => {
  const response = await fetch(`${BASE_URL}/matches/`);
  const data = await response.json();

  return data.matches;
};
