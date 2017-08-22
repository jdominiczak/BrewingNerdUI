import { combineReducers } from 'redux';
import AlertReducer from './alert_reducer'

const rootReducer = combineReducers({
  alerts: AlertReducer
});

export default rootReducer;
