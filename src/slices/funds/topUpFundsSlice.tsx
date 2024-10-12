import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopUpFundsState {
  objData: Record<string, any>;
  objPayload: Record<string, any>;
  validationErrors: Record<string, any>;
}

const initialState: TopUpFundsState = {
  objData: [],
  objPayload: {},
  validationErrors: {},
};

export const topUpFundsSlice = createSlice({
  name: 'topUpFunds',
  initialState,
  reducers: {
    setObjData: (state, action: PayloadAction<any[]>) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action: PayloadAction<Record<string, any>>) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = {};
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} = topUpFundsSlice.actions;

export default topUpFundsSlice.reducer;
