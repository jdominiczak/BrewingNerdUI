import _ from 'lodash';
import { REQUEST_ALERTS, RECEIVE_ALERTS, MODIFY_ALERT, DELETE_ALERT } from '../actions/types';
import { normalizeArray } from '../util';


const initialState = {
  lastUpdated: 0,
  isFetching: false,
  alerts: {},
};


export default function (state = initialState, action) {
  switch (action.type) {
    case MODIFY_ALERT: {
      const newAlerts = Object.assign({}, state.alerts);
      newAlerts[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, {
        alerts: newAlerts,
      });
      // return newState;
    }
    case DELETE_ALERT: {
      if (action.payload.status === 204) {
        const oldAlert = _.omit(state.alerts, (value) => {
          if (value.url === action.payload.request.responseURL) {
            return true;
          }
          return false;
        });
        return Object.assign({}, state, {
          alerts: oldAlert,
        });
      }
      // TODO: Handle an error on deletion?
      return state;
    }
    case REQUEST_ALERTS: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case RECEIVE_ALERTS: {
      const newAlerts = normalizeArray(action.alerts, 'id');
      return Object.assign({}, state, {
        isFetching: false,
        alerts: newAlerts,
        lastUpdated: action.receivedAt,
      });
    }
    default: {
      return state;
    }
  }
}
