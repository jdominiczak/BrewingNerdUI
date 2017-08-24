import { FETCH_ALERTS, MODIFY_ALERT, DELETE_ALERT } from '../actions/types';

const initialState = {
  lastUpdated: 0,
  alerts: []
}


export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALERTS:
      //console.log(action.payload.data);
      return Object.assign({}, state, {
        alerts: action.payload.data,
        lastUpdated: Date.now()
      })
    case MODIFY_ALERT:

      let oldIndex = state.alerts.indexOf(state.alerts.find((value,index) => (value.url == action.payload.data.url) ? true : false))
      //let oldData = newState.alerts.find((value,index) => (value.url == action.payload.data.url) ? true : false )
      let newState = Object.assign({}, state, {
        alerts: [...state.alerts.slice(0, oldIndex),
                action.payload.data,
                ...state.alerts.slice(oldIndex + 1)]
      })


      //newState.alerts.splice(newState.alerts.indexOf(oldData), 1)
      //newState.alerts = newState.alerts.concat(action.payload.data)
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
    default:
      return state;
  }
}



/**
export default function() {
  return [

    { id: 1, title: "Title 1", text: "Text 1", time: "1 min" },
    { id: 2, title: "Title 2", text: "Text 2", time: "2 mins" },
    { id: 3, title: "Title 3", text: "Text 3", time: "3 mins" },
    { id: 4, title: "Title 4", text: "Text 4", time: "4 mins" },
    { id: 5, title: "Title 5", text: "Text 5", time: "5 mins" }

  ];
}
**/
