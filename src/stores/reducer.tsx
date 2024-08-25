import { combineReducers } from '@reduxjs/toolkit';

import recipientInformationReducer from '@/slices/information/recipientInformationSlice';

const reducer = combineReducers({
  recipientInformation: recipientInformationReducer,
});

export default reducer;
