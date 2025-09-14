export const getWeekScoreboard = async (weekNumber: number) => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2025&week=${weekNumber}`;
  // const url =
  //   "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2054&seasontype=3&week=1";

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getGameSummary = async (eventId: string) => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${eventId}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// Get a specific game data
// Does this get live data?
// https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=401772936

// Get all Games
// https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2025&week=2
