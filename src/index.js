import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';
import { fetchAlerts } from './actions';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

//Kick off the fetch alerts on load

store.dispatch(fetchAlerts())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.wrapper'));
