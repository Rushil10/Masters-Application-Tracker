import {
  REMOVE_STUDENT,
  SET_LOGIN_ERROR,
  STORE_STUDENT,
  STUDENT_LOADING,
} from '../types';

const initialState = {
  signedIn: false,
  loading: false,
  error: '',
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case STORE_STUDENT:
      return {
        ...state,
        signedIn: true,
        data: action.payload,
        loading: false,
        error: '',
      };
    case REMOVE_STUDENT:
      return {
        ...state,
        signedIn: false,
        data: {},
      };
    case STUDENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
