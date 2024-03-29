import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import applicationsReducer from './reducers/applicationsReducer';
import loiReducer from './reducers/loiReducer';
import lorReducer from './reducers/lorReducer';
import resumeReducer from './reducers/resumeReducer';
import studentReducer from './reducers/studentReducer';
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  student: studentReducer,
  resume: resumeReducer,
  loi: loiReducer,
  application: applicationsReducer,
  lor: lorReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
