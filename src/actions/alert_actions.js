import axios from 'axios';
import { FETCH_ALERTS, MODIFY_ALERT, DELETE_ALERT, REQUEST_ALERTS, RECEIVE_ALERTS } from './types';


function requestAlerts() {
  return {
    type: REQUEST_ALERTS
  }
}

function receiveAlerts(response) {
  return {
    type: RECEIVE_ALERTS,
    alerts: response,
    receivedAt: Date.now()
  }
}

function fetchAlerts() {
  return dispatch => {
    dispatch(requestAlerts())
    return axios.get('http://127.0.0.1:8000/alerts/')
      .then(response => dispatch(receiveAlerts(response.data)))
  }
}

function shouldFetchAlerts(state) {
  //Debounce time of every 5 Seconds
  if( (Date.now() - state.alerts.lastUpdated) > 5000){
    return true
  } else {
    return false
  }
}

export function fetchAlertsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAlerts(getState())) {
      return dispatch(fetchAlerts())
    }
  }
}

export function modifyAlert(url, object) {
  return dispatch => {
    return axios.patch(url, object)
    .then(response => dispatch(modifyAlertReceived(response)))
  }
}


function modifyAlertReceived(response) {
  return {
    type: MODIFY_ALERT,
    payload: response
  };
}

export function deleteAlert(url) {
  return dispatch => {
    return axios.delete(url)
    .then(response => dispatch(deleteAlertReceived(response)))
  }
}

function deleteAlertReceived(response) {

  return {
    type: DELETE_ALERT,
    payload: response
  };
}
