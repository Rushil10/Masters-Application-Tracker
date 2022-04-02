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
  UPDATE_SCORE_LOADING,
  UPDATE_SCORE_ERROR,
} from '../types';

const initialState = {
  signedIn: false,
  loading: false,
  scoreLoading: false,
  scoreError: '',
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
    case UPDATE_SCORE_ERROR:
      return {
        ...state,
        scoreError: action.payload,
        scoreLoading: false,
      };
    case STORE_STUDENT:
      return {
        ...state,
        signedIn: true,
        data: action.payload,
        loading: false,
        error: '',
        scoreLoading: false,
        scoreError: '',
      };
    case REMOVE_STUDENT:
      return {
        ...state,
        signedIn: false,
        data: {},
        loading: false,
        error: '',
        scoreLoading: false,
        scoreError: '',
      };
    case UPDATE_SCORE_LOADING:
      return {
        ...state,
        scoreLoading: action.payload,
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
