import type { Boxpool, User } from "./types";

export const testUser: User = {
  id: 1,
  name: "John Naeder",
  email: "madhead324@gmail.com",
};

export const boxpoolData: Boxpool = {
  id: 1,
  user: testUser,
  eventId: "401772936",
  boxNumbers: {
    homeBoxNumbers: [9, 1, 2, 7, 0, 3, 4, 6, 5, 8],
    awayBoxNumbers: [3, 5, 9, 0, 7, 1, 6, 2, 4, 8],
  },
  prizeNumbers: {
    gameScore: {
      FirstQuarter: 5000,
      SecondQuarter: 15000,
      ThirdQuarter: 5000,
      Final: 50000,
    },
    plusTwo: null,
    plusFive: null,
    reverse: null,
  },
  boxes: [],
};
