export default async function handler(req, res) {
  const { teamId } = req.query;
  const apiUrl = `https://api.football-data.org/v4/teams/${teamId}`;
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
