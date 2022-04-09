import axios from 'axios';
import url from '../../server/api.js';
import {LOI_DATA, LOI_ERROR, LOI_LOADING} from '../types.js';
import {AsyncStorage} from 'react-native';

export const getLoiOfUser = () => async dispatch => {
  dispatch({type: LOI_LOADING, payload: true});
  var token = await AsyncStorage.getItem('token');
  var res = await axios.get(`${url}/loi`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    console.log(res.data);
    dispatch({type: LOI_DATA, payload: res.data.lois});
  } else {
    var err = 'ERROR in GETTING LOI';
    dispatch({type: LOI_ERROR, payload: err});
    dispatch({type: LOI_LOADING, payload: false});
  }
};
