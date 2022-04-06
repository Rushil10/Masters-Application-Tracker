import axios from 'axios';
import url from '../../server/api.js';
import jwt_decode from 'jwt-decode';
import {RESUME_DATA, RESUME_ERROR, RESUME_LOADING} from '../types.js';
import {AsyncStorage} from 'react-native';

export const getResumeOfUser = () => async dispatch => {
  dispatch({type: RESUME_LOADING, payload: true});
  var token = await AsyncStorage.getItem('token');
  var res = await axios.get(`${url}/resume`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    console.log(res.data);
    dispatch({type: RESUME_DATA, payload: res.data.resumes});
  } else {
    var err = 'ERROR in GETTING RESUME';
    dispatch({type: RESUME_ERROR, payload: err});
    dispatch({type: RESUME_LOADING, payload: false});
  }
};
