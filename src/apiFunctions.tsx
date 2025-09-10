import axios from "axios";

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

export const getSportsPlayByPlay = async () => {
  const url =
    "https://replay.sportsdata.io/api/v3/nfl/pbp/json/playbyplay/19039?key=aa2adedec59b4b1481504f81c7efdc41";

  console.log(url);
  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  return data;
};
