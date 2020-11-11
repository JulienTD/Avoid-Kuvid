import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import loginReducer from './Reducers/loginReducer';
import signupReducer from './Reducers/signupReducer';

const reducers = combineReducers({
    loginReducer,
    signupReducer
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));