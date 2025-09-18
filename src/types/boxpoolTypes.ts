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

export type Boxpool = {
  id: string;
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
  name?: string;
  image?: string;
  boxNumber?: number;
  font?: string;
  fontSize?: number;
};

export type Boxes = {
  [boxNumber: number]: Box;
};
