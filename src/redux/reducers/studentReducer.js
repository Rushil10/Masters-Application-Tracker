import {
  REMOVE_STUDENT,
  SET_LOGIN_ERROR,
  STORE_STUDENT,
  STUDENT_LOADING,
  UPDATE_GRE_SCORES,
  UPDATE_TOEFL_SCORES,
  UPDATE_CAT_SCORES,
  UPDATE_GATE_SCORES,
  UPDATE_GMAT_SCORES,
  UPDATE_IELTS_SCORES,
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
    case UPDATE_GRE_SCORES:
      return {
        ...state,
        data: {
          ...state.data,
          gre_score: action.payload,
        },
      };
    case UPDATE_GMAT_SCORES:
      return {
        ...state,
        data: {
          ...state.data,
          gmat_score: action.payload,
        },
      };
    case UPDATE_GATE_SCORES:
      return {
        ...state,
        data: {
          ...state.data,
          gate_score: action.payload,
        },
      };
    case UPDATE_CAT_SCORES:
      return {
        ...state,
        data: {
          ...state.data,
          cat_score: action.payload,
        },
      };
    case UPDATE_TOEFL_SCORES:
      return {
        ...state,
        data: {
          ...state.data,
          toefl_score: action.payload,
        },
      };
    case UPDATE_IELTS_SCORES:
      return {
        ...state,
        data: {
          ...state.data,
          ielts_score: action.payload,
        },
      };
    default:
      return state;
  }
}
