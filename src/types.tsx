export type Situation = {
  distance: number;
  down: number;
  yardLine: number;
  possession: string;
  downDistanceText: string;
  lastPlay: {
    text: string;
  };
};

export type Competition = {
  date: string;
  competitors: Competitor[];
  situation: Situation | null;
  status: { type: StatusType };
};

export type LineScore = {
  displayValue: string;
};

export type Competitor = {
  homeAway: string;
  team: Team;
  score: string;
  linescores: LineScore[] | null;
  winner: boolean;
};

export type TeamLogo = {
  href: string;
  height: number;
  width: number;
  alt: string;
};

export type Team = {
  abbreviation: string;
  color: string;
  alternateColor: string;
  displayName: string;
  location: string;
  logo: string;
  logos: TeamLogo[];
  name: string;
};

export type StatusType = {
  name: string;
  completed: boolean;
  description: string;
  detail: string;
};

export type GameSummary = {
  header: Game;
};

export type Game = {
  id: string;
  competitions: Competition[];
  status: {
    displayClock: string;
    period: number;
    type: StatusType;
  } | null;
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
  FirstQuarter: string;
  SecondQuarter: string;
  ThirdQuarter: string;
  Final: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Box = {
  id: number;
  boxNumber: number;
  name: string;
  image: string;
};

export type Boxpool = {
  id: number;
  user: User;
  eventId: string;
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
  boxes: Box[];
};
