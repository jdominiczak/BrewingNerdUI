import axios from 'axios';
import { FETCH_ALERTS } from './types';

export function fetchAlerts() {

  //let state = getState().alerts
  //console.log(state)
  //if (state.alerts.lastUpdated
  const request = axios.get('http://127.0.0.1:8000/alerts/');
  return {
    type: FETCH_ALERTS,
    payload: request
  };
}
