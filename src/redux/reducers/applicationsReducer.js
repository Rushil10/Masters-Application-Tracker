import {
  APPLICATIONS_DATA,
  APPLICATIONS_ERROR,
  LOADING_APPLICATIONS,
} from '../types';

const initialState = {
  applications: [],
  loading: false,
  error: '',
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APPLICATIONS_DATA:
      return {
        ...state,
        applications: action.payload,
        loading: false,
        error: '',
        loaded: true,
      };
    case LOADING_APPLICATIONS:
      return {
        ...state,
        loading: action.payload,
      };
    case APPLICATIONS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
