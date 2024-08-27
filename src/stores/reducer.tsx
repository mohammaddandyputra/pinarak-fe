import { combineReducers } from '@reduxjs/toolkit';

import recipientInformationReducer from '@/slices/information/recipientInformationSlice';
import senderInformationReducer from '@/slices/information/senderInformationSlice';

const reducer = combineReducers({
  recipientInformation: recipientInformationReducer,
  senderInformation: senderInformationReducer,
});

export default reducer;
