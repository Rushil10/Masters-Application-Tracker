import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import loiReducer from './reducers/loiReducer';
import resumeReducer from './reducers/resumeReducer';
import studentReducer from './reducers/studentReducer';
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  student: studentReducer,
  resume: resumeReducer,
  loi: loiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
