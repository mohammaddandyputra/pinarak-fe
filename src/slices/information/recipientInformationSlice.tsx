import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipientInformationState {
  objData: any[];
  objFilter: Record<string, any>;
  objPayload: Record<string, any>;
  validationErrors: Record<string, any>;
}

const initialState: RecipientInformationState = {
  objData: [],
  objFilter: {},
  objPayload: {},
  validationErrors: {},
};

export const recipientInformationSlice = createSlice({
  name: 'recipientInformation',
  initialState,
  reducers: {
    setObjData: (state, action: PayloadAction<any[]>) => {
      state.objData = action.payload;
    },
    setObjFilter: (state, action: PayloadAction<Record<string, any>>) => {
      state.objFilter = action.payload;
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
    resetObjFilter: (state) => {
      state.objFilter = {};
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
  setObjFilter,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjFilter,
  resetObjPayload,
  resetValidationErrors,
} = recipientInformationSlice.actions;

export default recipientInformationSlice.reducer;
