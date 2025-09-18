export type GameSummary = {
  header: Game;
  scoringPlays: ScoringPlay[];
};

export type Game = {
  id: string;
  competitions: Competition[];
  date: string;
  shortName: string;
  status: {
    displayClock: string;
    period: number;
    type: StatusType;
  } | null;
};

export type ScoringPlay = {
  period: { number: number };
  team: Team;
  text: string;
  clock: { displayValue: String; value: number };
  scoringType?: {
    name: string;
    displayName: string;
    abbreviation: string;
  };
  awayScore: number;
  homeScore: number;
  type?: {
    abbreviation: string;
    text: string;
  };
};

export type Competition = {
  date: string;
  competitors: Competitor[];
  status: {
    displayClock: string;
    period?: number;
    type: StatusType;
  };
};

export type StatusType = {
  name: string;
  completed: boolean;
  description: string;
  detail: string;
};

export type Competitor = {
  id: string;
  homeAway: string;
  team: Team;
  score: string;
  linescores: LineScore[] | null;
  winner: boolean;
  possession?: boolean;
};

export type LineScore = {
  displayValue: string;
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

export type TeamLogo = {
  href: string;
  height: number;
  width: number;
  alt: string;
  rel: string[];
  lastUpdated: string;
};
