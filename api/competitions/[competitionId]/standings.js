export default async function handler(req, res) {
  const { competitionId } = req.query;
  const { season } = req.query;
  const apiUrl = season
    ? `https://api.football-data.org/v4/competitions/${competitionId}/standings?season=${season}`
    : `https://api.football-data.org/v4/competitions/${competitionId}/standings`;
  const apiKey = process.env.FOOTBALL_API_KEY;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Auth-Token': apiKey,
      },
    });
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
