import testData from "./savedJSONData/Test1.json";

export const testSportsData = async () => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2025&week=2`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const savedTestData = () => {
  return testData;
};

// Get a specific game data
// Does this get live data?
// https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=401772936

// Get all Games
// https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2025&week=2
