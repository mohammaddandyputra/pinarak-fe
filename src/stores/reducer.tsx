import { combineReducers } from '@reduxjs/toolkit';

import recipientInformationReducer from '@/slices/information/recipientInformationSlice';
import senderInformationReducer from '@/slices/information/senderInformationSlice';
import orderShipmentReducer from '@/slices/shipment/orderShipmentSlice';
import orderShipmentFormReducer from '@/slices/shipment/orderShipmentFormSlice';
import topUpFundsReducer from '@/slices/funds/topUpFundsSlice';

const reducer = combineReducers({
  recipientInformation: recipientInformationReducer,
  senderInformation: senderInformationReducer,
  orderShipment: orderShipmentReducer,
  orderShipmentForm: orderShipmentFormReducer,
  topUpFunds: topUpFundsReducer,
});

export default reducer;
