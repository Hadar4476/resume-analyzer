import { IPosition, IPositionsState, IRootState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import positionsMock from "@/mocks/positions.json";

const defaultPositionsState: IPositionsState = {
  // positions: [...(positionsMock as IPosition[])],
  positions: [],
};

const positions = createSlice({
  name: "positions",
  initialState: defaultPositionsState,
  reducers: {
    setPositions: (state, action: PayloadAction<IPosition[]>) => {
      state.positions = [...action.payload];
    },
  },
});

export const positionsActions = positions.actions;

export const positionsSelector = (state: IRootState) => state.positions;

export default positions.reducer;
