import { combineReducers } from 'redux';

import auth from './auth';
import message from './message';
import settings from './settings';

const rootReducer = combineReducers({
  auth,
  message,
  settings,
});

export default rootReducer;
