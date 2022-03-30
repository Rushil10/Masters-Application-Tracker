import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk';
import studentReducer from './reducers/studentReducer';
const initialState = {};

const middleware = [thunk]

const reducers = combineReducers({
    student:studentReducer
})

const store = createStore(reducers,initialState,compose(applyMiddleware(...middleware)))

export default store;