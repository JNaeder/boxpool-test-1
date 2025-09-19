import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/userTypes";
import type { Boxpool } from "@/types/boxpoolTypes";

const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: null as User | null,
    boxpools: [] as Boxpool[],
  },
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setBoxPools(state, actions: PayloadAction<Boxpool[]>) {
      state.boxpools = actions.payload;
    },
    clearBoxPools(state) {
      state.boxpools = [];
    },
  },
});

export const { setCurrentUser, setBoxPools, clearBoxPools } = userSlice.actions;
export default userSlice.reducer;
