import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderShipmentFormState {
  objPayload: Record<string, any>;
  validationErrors: Record<string, any>;
}

const initialState: OrderShipmentFormState = {
  objPayload: {},
  validationErrors: {},
};

export const orderShipmentFormSlice = createSlice({
  name: 'orderShipmentForm',
  initialState,
  reducers: {
    setObjPayload: (state, action: PayloadAction<Record<string, any>>) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.validationErrors = action.payload;
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
  setObjPayload,
  setValidationErrors,
  resetObjPayload,
  resetValidationErrors,
} = orderShipmentFormSlice.actions;

export default orderShipmentFormSlice.reducer;
