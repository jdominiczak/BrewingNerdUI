import axios from 'axios';
import { FETCH_ALERTS, MODIFY_ALERT, DELETE_ALERT } from './types';






/**
*
*   Alert Actions
*
**/
export function fetchAlerts() {
  const request = axios.get('http://127.0.0.1:8000/alerts/');
  return {
    type: FETCH_ALERTS,
    payload: request
  };
}

export function modifyAlert(url, object) {
  const request = axios.patch(url, object);
  return {
    type: MODIFY_ALERT,
    payload:request
  };
}

export function deleteAlert(url) {
  const request = axios.delete(url);
  return {
    type: DELETE_ALERT,
    payload:request
  };
}
