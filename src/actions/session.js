import { reset } from 'redux-form';
import { Socket } from 'phoenix';
import api from '../api';
import { fetchUserRooms } from './rooms';
import { connectToChannel } from './room';

const API_URL = "https://intense-plateau-37336.herokuapp.com/api";
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'wss').replace('/api', '');


function connectToSocket(dispatch) {
  const token = JSON.parse(localStorage.getItem('token'));
  const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
    params: { token },
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
  });
  socket.connect();
  dispatch({ type: 'SOCKET_CONNECTED', socket });
}

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
  dispatch(fetchUserRooms(response.data.id));
  connectToSocket(dispatch);
}

export function login(data, history) {
  return dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      history.push('/r/1');
    });
}

export function signup(data, history) {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      console.log("AWDAWDAWD<<<<<");
      history.push('/');
    });
}

export function logout(history) {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      window.location = "/";
    });
}

export function authenticate() {
  return dispatch => api.post('/sessions/refresh')
    .then((response) => {
      setCurrentUser(dispatch, response);
    })
    .catch(() => {
      localStorage.removeItem('token');
      window.location = '/login';
    });
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });
