import type { Boxpool, PrizeTypes, TeamSmall } from "@/types/boxpoolTypes";
import type { GameSummary } from "@/types/gameTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateRandom10Numbers } from "@/helperFunctions";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentGameSummary: null as GameSummary | null,
    currentBoxpoolData: null as Boxpool | null,
  },
  reducers: {
    setCurrentGameSummary(state, action: PayloadAction<GameSummary>) {
      state.currentGameSummary = action.payload;
    },
    setCurrentBoxpoolData(state, action: PayloadAction<Boxpool>) {
      state.currentBoxpoolData = action.payload;
    },
    clearGameAndBoxPoolData(state) {
      state.currentBoxpoolData = null;
      state.currentGameSummary = null;
    },
    editBoxData(
      state,
      action: PayloadAction<{
        boxNumber: number;
        newData: Record<string, unknown>;
      }>
    ) {
      const { boxNumber, newData } = action.payload;
      console.log(action.payload);
      if (state.currentBoxpoolData) {
        // state.currentBoxpoolData.boxes[boxNumber] = {
        //   ...state.currentBoxpoolData.boxes[boxNumber],
        //   ...newData,
        // };
        state.currentBoxpoolData.boxes[boxNumber] = newData;
      }
    },
    deleteBoxData(
      state,
      actions: PayloadAction<{
        boxNumber: number;
      }>
    ) {
      if (state.currentBoxpoolData) {
        delete state.currentBoxpoolData.boxes[actions.payload.boxNumber];
      }
    },
    editNumberBoxData(
      state,
      action: PayloadAction<{
        boxNumber: number;
        newValue: number;
        homeAway: "home" | "away";
      }>
    ) {
      const { boxNumber, newValue, homeAway } = action.payload;
      if (state.currentBoxpoolData) {
        if (homeAway === "away") {
          state.currentBoxpoolData.boxNumbers.awayBoxNumbers[boxNumber] =
            newValue;
        } else {
          state.currentBoxpoolData.boxNumbers.homeBoxNumbers[boxNumber] =
            newValue;
        }
      }
    },
    generateRandomNumberBoxes(state) {
      if (state.currentBoxpoolData) {
        state.currentBoxpoolData.boxNumbers.homeBoxNumbers =
          generateRandom10Numbers();
        state.currentBoxpoolData.boxNumbers.awayBoxNumbers =
          generateRandom10Numbers();
      }
    },
    editPrizeboard(
      state,
      action: PayloadAction<{
        newValue: string;
        prizeType: PrizeTypes;
      }>
    ) {
      const { newValue, prizeType } = action.payload;
      if (state.currentBoxpoolData) {
        if (prizeType.winType === "gameScore") {
          state.currentBoxpoolData.prizeNumbers.gameScore[prizeType.quarter] =
            newValue;
        }
      }
    },
    addGameInfoToBoxpoolData(
      state,
      action: PayloadAction<{
        date: string;
        teams: { awayTeam: TeamSmall; homeTeam: TeamSmall };
      }>
    ) {
      if (state.currentBoxpoolData) {
        state.currentBoxpoolData.gameInfo = action.payload;
      }
    },
  },
});

export const {
  setCurrentGameSummary,
  setCurrentBoxpoolData,
  clearGameAndBoxPoolData,
  editBoxData,
  deleteBoxData,
  editNumberBoxData,
  generateRandomNumberBoxes,
  editPrizeboard,
  addGameInfoToBoxpoolData,
} = gameSlice.actions;
export default gameSlice.reducer;
