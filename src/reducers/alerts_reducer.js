import { FETCH_ALERTS } from '../actions/types';

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
  }
  return state;
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
