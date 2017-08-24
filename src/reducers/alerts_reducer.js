import { REQUEST_ALERTS, RECEIVE_ALERTS, MODIFY_ALERT, DELETE_ALERT } from '../actions/types';

const initialState = {
  lastUpdated: 0,
  isFetching: false,
  alerts: []
}


export default function(state = initialState, action) {
  switch (action.type) {


    case MODIFY_ALERT:
      let oldIndex = state.alerts.indexOf(state.alerts.find((value,index) => (value.url == action.payload.data.url) ? true : false))
      //let oldData = newState.alerts.find((value,index) => (value.url == action.payload.data.url) ? true : false )
      let newState = Object.assign({}, state, {
        alerts: [...state.alerts.slice(0, oldIndex),
                action.payload.data,
                ...state.alerts.slice(oldIndex + 1)]
      })
      return newState;

    case DELETE_ALERT:
      if(action.payload.status == 204) {  //204 means it was deleted
        let oldIndex = state.alerts.indexOf(state.alerts.find((value,index) => (value.url == action.payload.request.responseURL) ? true : false ))
        newState = Object.assign({}, state,  {
          alerts: [...state.alerts.slice(0, oldIndex),
                    ...state.alerts.slice(oldIndex + 1) ]
        })
        return newState;
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
        return Object.assign({}, state, {
          isFetching: false,
          alerts: action.alerts,
          lastUpdated: action.receivedAt
        })
    default:
      return state;
  }
}
