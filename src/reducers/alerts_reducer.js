import { REQUEST_ALERTS, RECEIVE_ALERTS, MODIFY_ALERT, DELETE_ALERT } from '../actions/types';
import { normalizeArray } from '../util';
import _ from 'lodash';

const initialState = {
  lastUpdated: 0,
  isFetching: false,
  alerts: {}
}


export default function(state = initialState, action) {
  switch (action.type) {


    case MODIFY_ALERT:
      let newAlerts = Object.assign({}, state.alerts)
      newAlerts[action.payload.data.id] = action.payload.data
      return Object.assign({}, state, {
        alerts: newAlerts
      })
      return newState;

    case DELETE_ALERT:
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
    case REQUEST_ALERTS:
        return Object.assign({}, state, {
          isFetching: true
        })
    case RECEIVE_ALERTS:
        newAlerts = normalizeArray(action.alerts, "id")
        return Object.assign({}, state, {
          isFetching: false,
          alerts: newAlerts,
          lastUpdated: action.receivedAt
        })
    default:
      return state;
  }
}
