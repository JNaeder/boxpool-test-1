export type Quater = {
  quaterNumber: number;
  awayScore: number;
  homeScore: number;
};

export type Game = {
  schedule: {
    startTime: string;
    playedStatus: string;
    awayTeam: {
      id: number;
      abbreviation: string;
    };
    homeTeam: {
      id: number;
      abbreviation: string;
    };
  };
  score: {
    homeScoreTotal: number | null;
    awayScoreTotal: number | null;
    currentQuarterSecondsRemaining: number | null;
    quarters: Quater[];
    currentQuarter: number | null;
    currentIntermission: number | null;
  };
};

export type Team = {
  abbreviation: string;
  city: string;
  id: number;
  name: string;
  teamColoursHex: string[];
  officialLogoImageSrc: string;
};

export type References = {
  teamReferences: Team[];
};
