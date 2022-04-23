import axios from 'axios';
import url from '../../server/api.js';
import {
  APPLICATIONS_DATA,
  APPLICATIONS_ERROR,
  LOADING_APPLICATIONS,
  SORT_DONE,
  SORT_LOADING,
} from '../types.js';
import {AsyncStorage} from 'react-native';
import {
  sortByApplicationFees,
  sortByDate,
  sortByFess,
  sortByTag,
} from '../../Constants/scoreFunctions.js';

export const getApplicationsOfUser = () => async dispatch => {
  dispatch({type: LOADING_APPLICATIONS, payload: true});
  var token = await AsyncStorage.getItem('token');
  var res = await axios.get(`${url}/application`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    ////console.log(res.data);
    dispatch({type: APPLICATIONS_DATA, payload: res.data.applications});
  } else {
    var err = 'ERROR in GETTING Applications';
    dispatch({type: APPLICATIONS_ERROR, payload: err});
    dispatch({type: LOADING_APPLICATIONS, payload: false});
  }
};

export const sortApplication = (type, applications) => async dispatch => {
  dispatch({type: SORT_LOADING, payload: true});
  ////console.log(applications);
  var newApplications = [];
  if (type === 'fees') {
    newApplications = await sortByFess(applications);
  } else if (type === 'date') {
    newApplications = await sortByDate(applications);
  } else if (type === 'tag') {
    newApplications = await sortByTag(applications);
  } else if (type === 'afees') {
    newApplications = await sortByApplicationFees(applications);
  } else {
    newApplications = applications;
  }
  dispatch({type: SORT_DONE, payload: newApplications});
};

export const applicationLogout = () => async dispatch => {
  dispatch({type: APPLICATIONS_DATA, payload: []});
};
