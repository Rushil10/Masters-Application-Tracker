import axios from 'axios';
import url from '../../server/api.js';
import jwt_decode from 'jwt-decode';
import {
  REMOVE_STUDENT,
  SET_LOGIN_ERROR,
  STORE_STUDENT,
  STUDENT_LOADING,
  UPDATE_SCORE_ERROR,
  UPDATE_SCORE_LOADING,
} from '../types.js';
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

export const addMyScore = (type, score, obj) => async dispatch => {
  dispatch({type: UPDATE_SCORE_LOADING, payload: true});
  var type2 = `UPDATE_${type}_SCORES`;
  var token = await AsyncStorage.getItem('token');
  var res = await axios.post(`${url}/student/update/score`, obj, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    dispatch({type: type2, payload: score});
    dispatch({type: UPDATE_SCORE_LOADING, payload: false});
    await AsyncStorage.setItem('token', res.data.token);
  } else {
    var error = 'Could Not Update Scores !';
    dispatch({type: UPDATE_SCORE_ERROR, payload: error});
  }
};

export const studentLogout = () => async dispatch => {
  dispatch({type: REMOVE_STUDENT});
};
