import { combineReducers } from 'redux';
import AlertReducer from './alerts_reducer'

const rootReducer = combineReducers({
  alerts: AlertReducer
});

export default rootReducer;
