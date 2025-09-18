import type { Boxpool } from "@/types/boxpoolTypes";
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
      if (state.currentBoxpoolData) {
        state.currentBoxpoolData.boxes[action.payload.boxNumber] = {
          ...state.currentBoxpoolData.boxes[action.payload.boxNumber],
          ...action.payload.newData,
        };
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
        } else if (homeAway === "home") {
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
  },
});

export const {
  setCurrentGameSummary,
  setCurrentBoxpoolData,
  clearGameAndBoxPoolData,
  editBoxData,
  editNumberBoxData,
  generateRandomNumberBoxes,
} = gameSlice.actions;
export default gameSlice.reducer;
