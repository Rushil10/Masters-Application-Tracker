import {LOR_DATA, LOR_ERROR, LOR_LOADING} from '../types';

const initialState = {
  lors: [],
  loading: false,
  error: '',
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOR_DATA:
      return {
        ...state,
        lors: action.payload,
        loading: false,
        error: '',
        loaded: true,
      };
    case LOR_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
