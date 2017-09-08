import axios from 'axios';
import { MODIFY_ALERT, DELETE_ALERT, REQUEST_ALERTS, RECEIVE_ALERTS, ERROR_FETCHING_ALERTS, SELECTED_ALERT } from './types';


function requestAlerts() {
  return {
    type: REQUEST_ALERTS,
  };
}

function receiveAlerts(response) {
  return {
    type: RECEIVE_ALERTS,
    alerts: response,
    receivedAt: Date.now(),
  };
}

function errorSelectedRecipe() {
  return {
    type: ERROR_FETCHING_ALERTS,
  };
}

export function setSelectedAlert(alert, id = -1) {
  if (alert !== undefined) {
    return {
      type: SELECTED_ALERT,
      selectedAlert: alert,
      selectedAlertID: alert.id,
    };
  }
  return {
    type: SELECTED_ALERT,
    selectedAlert: {},
    selectedAlertID: id,
  };
}

function getAlertByID(id, state) {
  const alert = state.alerts[id];
  return alert;
}

export function setSelectedAlertByID(id) {
  return (dispatch, getState) => {
    dispatch(setSelectedAlert(getAlertByID(id, getState()), id));
  };
}

function fetchAlerts() {
  return (dispatch) => {
    dispatch(requestAlerts());
    return axios.get('http://127.0.0.1:8000/alerts/')
      .then(response => dispatch(receiveAlerts(response.data)))
      .catch(() => dispatch(errorSelectedRecipe()));
  };
}

function shouldFetchAlerts(state) {
  // Debounce time of every 5 Seconds
  if ((Date.now() - state.alerts.lastUpdated) > 5000) {
    return true;
  }
  return false;
}

export function fetchAlertsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAlerts(getState())) {
      return dispatch(fetchAlerts());
    }
    return null;
  };
}

function modifyAlertReceived(response) {
  return {
    type: MODIFY_ALERT,
    payload: response,
  };
}

export function modifyAlert(url, object) {
  return (dispatch) => {
    axios.patch(url, object)
      .then(response => dispatch(modifyAlertReceived(response)));
  };
}

function deleteAlertReceived(response) {
  return {
    type: DELETE_ALERT,
    payload: response,
  };
}

export function deleteAlert(url) {
  return (dispatch) => {
    axios.delete(url)
      .then(response => dispatch(deleteAlertReceived(response)));
  };
}
