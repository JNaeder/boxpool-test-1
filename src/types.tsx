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
  id: string;
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
  id: string;
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

export type ScoringPlay = {
  period: { number: number };
  team: Team;
  text: string;
  clock: { displayValue: String; value: number };
  scoringType: {
    name: string;
    displayName: string;
    abbreviation: string;
  };
  awayScore: number;
  homeScore: number;
  type: {
    abbreviation: string;
    text: string;
  };
};

export type GameSummary = {
  header: Game;
  scoringPlays: ScoringPlay[];
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
  firstQuarter: string;
  secondQuarter: string;
  thirdQuarter: string;
  final: string;
};

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
};

export type Boxpool = {
  id?: string;
  name: string;
  userId: string;
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
  boxes: Boxes;
};

export type Box = {
  name: string;
  image: string;
  boxNumber: number;
  font: string;
  fontSize: number;
};

export type Boxes = {
  [boxNumber: number]: Box;
};
