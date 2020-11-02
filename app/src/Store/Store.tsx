import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducerTest from './Reducers/reducerTest';

const reducers = combineReducers({
    reducerTest
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));