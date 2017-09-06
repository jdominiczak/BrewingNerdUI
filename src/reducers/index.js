import { combineReducers } from 'redux';
import AlertReducer from './alerts_reducer';
import RecipesReducer from './recipes_reducer';

const rootReducer = combineReducers({
  alerts: AlertReducer,
  recipes: RecipesReducer
});

export default rootReducer;
