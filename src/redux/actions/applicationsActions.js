import axios from 'axios';
import url from '../../server/api.js';
import {
  APPLICATIONS_DATA,
  APPLICATIONS_ERROR,
  LOADING_APPLICATIONS,
} from '../types.js';
import {AsyncStorage} from 'react-native';

export const getApplicationsOfUser = () => async dispatch => {
  dispatch({type: LOADING_APPLICATIONS, payload: true});
  var token = await AsyncStorage.getItem('token');
  var res = await axios.get(`${url}/application`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    console.log(res.data);
    dispatch({type: APPLICATIONS_DATA, payload: res.data.applications});
  } else {
    var err = 'ERROR in GETTING Applications';
    dispatch({type: APPLICATIONS_ERROR, payload: err});
    dispatch({type: LOADING_APPLICATIONS, payload: false});
  }
};
