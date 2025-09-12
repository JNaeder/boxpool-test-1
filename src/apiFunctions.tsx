export const getSportsFeedData = async () => {
  const url = `${
    import.meta.env.VITE_SPORTSFEED_API_URL
  }/v2.1/pull/nfl/current/date/20250907/games.json`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(import.meta.env.VITE_SPORTSFEED_API_KEY),
    },
  });

  const data = await res.json();
  return data;
};

export const getSportsDataIOData = async () => {
  const url = `${
    import.meta.env.VITE_SPORTSDATA_API_URL
  }/v3/nfl/scores/json/ScoresByWeek/2025REG/1?key=${
    import.meta.env.VITE_SPORTSDATA_API_KEY
  }`;
  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  return data;
};

export const getSportsPlayByPlay = async (playNumber: number) => {
  const url = `${
    import.meta.env.VITE_SPORTSDATA_API_URL
  }/v3/nfl/scores/JSON/SimulatedScores/${playNumber}?key=${
    import.meta.env.VITE_SPORTSDATA_API_KEY
  }`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  return data;
};

export const testSportsData = async () => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2025&week=2&limit=16`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};
