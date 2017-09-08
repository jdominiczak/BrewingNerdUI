import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import configureStore from './configure_store';
import { fetchAlertsIfNeeded } from './actions/alert_actions';

const store = configureStore();

// Kick off the fetch alerts on load
store.dispatch(fetchAlertsIfNeeded());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.wrapper'));
