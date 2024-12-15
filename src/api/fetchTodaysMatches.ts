const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchTodaysMatches = async () => {
  const response = await fetch(`${BASE_URL}/matches/`, {
    headers: {
      'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
    },
  });
  const data = await response.json();

  return data.matches;
};
