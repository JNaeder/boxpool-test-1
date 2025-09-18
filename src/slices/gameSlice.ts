import type { Boxpool } from "@/types/boxpoolTypes";
import type { GameSummary } from "@/types/gameTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const {
  setCurrentGameSummary,
  setCurrentBoxpoolData,
  clearGameAndBoxPoolData,
  editBoxData,
} = gameSlice.actions;
export default gameSlice.reducer;
