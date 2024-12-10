export const fetchTodaysMatches = async () => {
  const response = await fetch('api/matches/', {
    headers: {
      'X-Auth-Token': `${import.meta.env.VITE_API_KEY}`,
    },
  });
  const data = await response.json();

  return data.matches;
};
