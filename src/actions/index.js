import axios from 'axios';
import { FETCH_ALERTS } from './types';

export function fetchAlerts() {
  const request = axios.get('http://127.0.0.1:8000/alerts/');

  return {
    type: FETCH_ALERTS,
    payload: request
  };
}
