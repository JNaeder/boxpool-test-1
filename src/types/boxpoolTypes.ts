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

export type PrizeTypes = {
  winType: keyof Boxpool["prizeNumbers"];
  quarter: keyof PrizeAmount;
};

export type PrizeAmount = {
  firstQuarter: string;
  secondQuarter: string;
  thirdQuarter: string;
  final: string;
};

export type TeamSmall = {
  name: string;
  abbreviation: string;
  primaryColor: string;
  logo: string;
};

export type GameInfo = {
  date: string;
  teams: {
    awayTeam: TeamSmall;
    homeTeam: TeamSmall;
  };
};

export type Boxpool = {
  id?: string;
  name?: string;
  userId: string;
  eventId: string;
  lastUpdated?: string;
  createdAt?: string;
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
  gameInfo?: GameInfo;
};

export type Box = {
  name?: string;
  image?: string;
  boxNumber?: number;
  font?: string;
  fontSize?: number;
};

export type Boxes = {
  [boxNumber: number]: Box;
};
