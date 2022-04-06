import {RESUME_DATA, RESUME_ERROR, RESUME_LOADING} from '../types';

const initialState = {
  resumes: [],
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESUME_DATA:
      return {
        ...state,
        resumes: action.payload,
        loading: false,
        error: '',
      };
    case RESUME_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case RESUME_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
