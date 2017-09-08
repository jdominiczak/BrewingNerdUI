import _ from 'lodash';
import { REQUEST_ALERTS, RECEIVE_ALERTS, MODIFY_ALERT, DELETE_ALERT, ERROR_FETCHING_ALERTS, SELECTED_ALERT, ERROR_SELECTING_ALERT } from '../actions/types';
import { normalizeArray } from '../util';


const initialState = {
  lastUpdated: 0,
  isFetching: false,
  errorFetching: false,
  errorSelectedAlert: false,
  alerts: {},
  selectedAlert: {},
  selectedAlertID: -1,
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
        errorFetching: false,
      });
    }
    case RECEIVE_ALERTS: {
      const newAlerts = normalizeArray(action.alerts, 'id');
      if (state.selectedAlertID !== -1) {
        // A selected Alert has been requested so set it
        // Check if it exists:
        const selectedAlert = newAlerts[state.selectedAlertID];
        if (selectedAlert !== undefined) {
          return Object.assign({}, state, {
            isFetching: false,
            errorFetching: false,
            alerts: newAlerts,
            lastUpdated: action.receivedAt,
            selectedAlert,
            errorSelectedAlert: false,
          });
        }
        return Object.assign({}, state, {
          isFetching: false,
          errorFetching: false,
          alerts: newAlerts,
          lastUpdated: action.receivedAt,
          selectedAlert: {},
          errorSelectedAlert: true,
        });
      }
      return Object.assign({}, state, {
        isFetching: false,
        errorFetching: false,
        alerts: newAlerts,
        lastUpdated: action.receivedAt,
      });
    }
    case ERROR_FETCHING_ALERTS: {
      return Object.assign({}, state, {
        isFetching: false,
        errorFetching: true,
      });
    }
    case ERROR_SELECTING_ALERT: {
      return Object.assign({}, state, {
        isFetching: false,
        errorSelectedAlert: true,
        selectedAlert: {},
        selectedAlertID: -1,
      });
    }
    case SELECTED_ALERT: {
      if (action.selectedAlert.id === undefined) {
        // selectedAlert is blank
        const selectedAlert = state.alerts[action.selectedAlertID];
        if (selectedAlert !== undefined) {
          // we found an alert by that id
          return Object.assign({}, state, {
            isFetching: false,
            errorFetching: false,
            selectedAlert,
            errorSelectedAlert: false,
          });
        } else if (state.isFetching) {
          // didn't find an alert but we are still fetching alerts, don't fail it yet
          return Object.assign({}, state, {
            selectedAlert: action.selectedAlert,
            selectedAlertID: action.selectedAlertID,
            errorSelectedAlert: false,
          });
        }
        return Object.assign({}, state, {
          // we're not fetching and we didn't find one
          selectedAlert: action.selectedAlert,
          selectedAlertID: action.selectedAlertID,
          errorSelectedAlert: true,
        });
      }
      // alert is provided, all is well
      return Object.assign({}, state, {
        selectedAlert: action.selectedAlert,
        selectedAlertID: action.selectedAlertID,
        errorSelectedAlert: false,
      });
    }
    default: {
      return state;
    }
  }
}
