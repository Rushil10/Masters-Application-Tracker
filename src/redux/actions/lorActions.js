import axios from 'axios';
import url from '../../server/api.js';
import {LOR_DATA, LOR_ERROR, LOR_LOADING} from '../types.js';
import {AsyncStorage} from 'react-native';

export const getLorOfUser = () => async dispatch => {
  dispatch({type: LOR_LOADING, payload: true});
  var token = await AsyncStorage.getItem('token');
  var res = await axios.get(`${url}/lor`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    //console.log(res.data);
    dispatch({type: LOR_DATA, payload: res.data.lors});
  } else {
    var err = 'ERROR in GETTING LOR';
    dispatch({type: LOR_ERROR, payload: err});
    dispatch({type: LOR_LOADING, payload: false});
  }
};

export const lorLogout = () => async dispatch => {
  dispatch({type: LOR_DATA, payload: []});
};
