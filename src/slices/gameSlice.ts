import type { Boxpool } from "@/types/boxpoolTypes";
import type { GameSummary } from "@/types/gameTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentEventId: null as string | null,
    currentGameSummary: null as GameSummary | null,
    currentBoxpoolData: null as Boxpool | null,
  },
  reducers: {
    setCurrentEventId(state, action: PayloadAction<string | null>) {
      state.currentEventId = action.payload;
    },
    setCurrentGameSummary(state, action: PayloadAction<GameSummary | null>) {
      state.currentGameSummary = action.payload;
    },
    setCurrentBoxpoolData(state, action: PayloadAction<Boxpool | null>) {
      state.currentBoxpoolData = action.payload;
    },
  },
});

export const {
  setCurrentEventId,
  setCurrentGameSummary,
  setCurrentBoxpoolData,
} = gameSlice.actions;
export default gameSlice.reducer;
