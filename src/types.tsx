export type User = {
  id: number;
  name: string;
  email: string;
};

export type Game = {
  AwayScore: number;
  AwayScoreQuarter1: number;
  AwayScoreQuarter2: number;
  AwayScoreQuarter3: number;
  AwayScoreQuarter4: number;
  AwayTeam: string;
  AwayTeamID: number;
  Closed: boolean;
  Date: string;
  GameKey: string;
  GlobalGameID: number;
  HomeScore: number;
  HomeScoreQuarter1: number;
  HomeScoreQuarter2: number;
  HomeScoreQuarter3: number;
  HomeScoreQuarter4: number;
  HomeTeam: string;
  HomeTeamID: number;
  LastUpdated: string;
  Quarter: string;
  QuarterDescription: string;
  Has1stQuarterStarted: boolean;
  Has2ndQuarterStarted: boolean;
  Has3rdQuarterStarted: boolean;
  Has4thQuarterStarted: boolean;
  Status: string;
  LastPlay: string;
  TimeRemaining: string;
  Possession: string;
};

export type Team = {
  TeamID: number;
  City: string;
  Name: string;
  FullName: string;
  PrimaryColor: string | null;
  SecondaryColor: string | null;
  TertiaryColor: string | null;
  QuaternaryColor: string | null;
  WikipediaLogoUrl: string | null;
};

export type WinningScore = {
  homeScore: number;
  awayScore: number;
};

export type Winners = {
  gameScore1stQuater: WinningScore | null;
  gameScore2ndQuater: WinningScore | null;
  gameScore3rdQuater: WinningScore | null;
  gameScoreFinal: WinningScore | null;
};

export type PrizeAmount = {
  FirstQuarter: number;
  SecondQuarter: number;
  ThirdQuarter: number;
  Final: number;
};

export type Boxpool = {
  id: number;
  user: User;
  game: Game;
  boxNumbers: {
    homeBoxNumbers: number[];
    awayBoxNumbers: number[];
  };
  prizeNumbers: {
    gameScore: PrizeAmount;
    plusTwo: PrizeAmount | null;
    plusFive: PrizeAmount | null;
    reverse: PrizeAmount | null;
  };
  boxNames: {};
};
