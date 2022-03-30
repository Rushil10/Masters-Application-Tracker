import axios from 'axios';
import url from '../../server/api.js';
import jwt_decode from 'jwt-decode';
import {SET_LOGIN_ERROR, STORE_STUDENT, STUDENT_LOADING} from '../types.js';
import {AsyncStorage} from 'react-native';

export const validateUser = student => async dispatch => {
  dispatch({type: STUDENT_LOADING, payload: true});
  var res = await axios.post(`${url}/student/validate`, student);
  if (res.data) {
    var decoded_data = jwt_decode(res.data.token);
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({type: STORE_STUDENT, payload: decoded_data});
  } else {
    var error = 'Could Not Authenticate !';
    dispatch({type: SET_LOGIN_ERROR, payload: error});
  }
};

export const getUserInfo = token => async dispatch => {
  dispatch({type: STUDENT_LOADING, payload: true});
  var decoded_data = jwt_decode(token);
  dispatch({type: STORE_STUDENT, payload: decoded_data});
};
