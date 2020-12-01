import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import loginReducer from './Reducers/loginReducer';
import signupReducer from './Reducers/signupReducer';
import userReducer from './Reducers/userReducer';
import facilityReducer from './Reducers/facilityReducer';

const reducers = combineReducers({
    loginReducer,
    signupReducer,
    userReducer,
    facilityReducer
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));