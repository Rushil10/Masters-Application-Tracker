import {LOI_DATA, LOI_ERROR, LOI_LOADING} from '../types';

const initialState = {
  lois: [],
  loading: false,
  error: '',
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOI_DATA:
      return {
        ...state,
        lois: action.payload,
        loading: false,
        error: '',
        loaded: true,
      };
    case LOI_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOI_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
