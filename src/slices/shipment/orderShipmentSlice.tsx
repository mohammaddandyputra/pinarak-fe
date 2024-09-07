import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderShipmentState {
  objData: any[];
  objFilter: Record<string, any>;
  objPayload: Record<string, any>;
  validationErrors: Record<string, any>;
}

const initialState: OrderShipmentState = {
  objData: [],
  objFilter: {},
  objPayload: {},
  validationErrors: {},
};

export const orderShipmentSlice = createSlice({
  name: 'orderShipment',
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
} = orderShipmentSlice.actions;

export default orderShipmentSlice.reducer;
