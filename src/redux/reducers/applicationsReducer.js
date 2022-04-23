import {
  APPLICATIONS_DATA,
  APPLICATIONS_ERROR,
  LOADING_APPLICATIONS,
  SORT_DONE,
  SORT_LOADING,
} from '../types';

const initialState = {
  applications: [],
  loading: false,
  error: '',
  loaded: false,
  sortLoading: false,
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
        sortLoading: false,
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
    case SORT_LOADING: {
      return {
        ...state,
        sortLoading: action.payload,
      };
    }
    case SORT_DONE: {
      return {
        ...state,
        applications: action.payload,
        sortLoading: false,
      };
    }
    default:
      return state;
  }
}
