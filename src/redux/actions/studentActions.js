import axios from 'axios';
import url from '../../server/api.js';

export const validateUser = student => async dispatch => {
  console.log('Her');
  var res = await axios.post(`${url}/student/validate`, student);
  console.log(res.data);
};
