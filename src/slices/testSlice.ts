import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "testing-123",
  initialState: 69,
  reducers: {
    plusOne(state) {
      return state + 1;
    },
    setValue(_state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { plusOne, setValue } = testSlice.actions;
export default testSlice.reducer;
