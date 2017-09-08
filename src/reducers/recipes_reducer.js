import { REQUEST_RECIPES, RECEIVE_RECIPES, MODIFY_RECIPE, DELETE_RECIPE, REQUEST_SELECTED_RECIPE, RECEIVE_SELECTED_RECIPE, ERROR_SELECTED_RECIPE } from '../actions/types';
import { normalizeArray } from '../util';


const initialState = {
  lastUpdated: 0,
  isFetching: false,
  errorFetching: false,
  recipes: {},
  isFetchingSelected: false,
  errorFetchingSelected: false,
  selectedRecipe: {},
};


export default function (state = initialState, action) {
  switch (action.type) {
    case MODIFY_RECIPE: {
      return state;
    }
    /*
    let newAlerts = Object.assign({}, state.alerts)
    newAlerts[action.payload.data.id] = action.payload.data
    return Object.assign({}, state, {
      alerts: newAlerts
    })
    return newState;
    */

    case DELETE_RECIPE: {
      return state;
    }
    /*
    if(action.payload.status == 204) {  //204 means it was deleted
      let oldAlert = _.omit(state.alerts, (value, key, object) => {
        if (value.url == action.payload.request.responseURL ) {
          return true;
        }
      })
      return Object.assign({}, state,  {
        alerts: oldAlert
      })
    }
    else {
      // TODO: Handle an error on deletion?
      return state;
    }
    */

    case REQUEST_RECIPES: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case RECEIVE_RECIPES: {
      const newRecipes = normalizeArray(action.recipes, 'id');
      //  console.log(newRecipes)
      return Object.assign({}, state, {
        isFetching: false,
        recipes: newRecipes,
        lastUpdated: action.receivedAt,
      });
    }
    case REQUEST_SELECTED_RECIPE: {
      return Object.assign({}, state, {
        isFetchingSelected: true,
        errorFetchingSelected: false,
        selectedRecipe: {},
      });
    }
    case RECEIVE_SELECTED_RECIPE: {
      return Object.assign({}, state, {
        isFetchingSelected: false,
        errorFetchingSelected: false,
        selectedRecipe: action.payload.data,
      });
    }
    case ERROR_SELECTED_RECIPE: {
      return Object.assign({}, state, {
        errorFetchingSelected: true,
        isFetchingSelected: false,
      });
    }
    default: {
      return state;
    }
  }
}
