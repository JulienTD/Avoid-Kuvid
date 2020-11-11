import  { ACTION_TYPES } from '../Store/Reducers/loginReducer'
import LoginService from '../Services/LoginSignup/LoginService';

export const logIn = (email: string, password: string) => {
    return (dispatch: any) => {

        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!email) {
            sendError(dispatch, "Email is missing");
            return (1);
        } else if (!reg.test(email)) {
            sendError(dispatch, "Email is invalid");
            return (1);
        } else if (!password) {
            sendError(dispatch, "Password is missing");
            return (1);
        }


        let service = new LoginService();
        let retValue = service.logIn({email: email, password: password}).then((value: any) => {
            logSucceed(dispatch)
            console.log('GOOD', value);
            return (0);
        }).catch((error: any) => {
            let errorMsg = "Network request failed";

            sendError(dispatch, errorMsg);
            console.log('ERR', error);
            return (1);
        })

        return (retValue);
    }
}

const sendError = (dispatch: any, error: string) => {
    setTimeout(() => {
        disableLogError(dispatch);
    }, 10000);
    logFailed(dispatch, error);
}

const disableLogError = (dispatch: any) => {
    dispatch({
        type: ACTION_TYPES.DISABLE_LOG_ERROR,
        msg: "",
    })
}

const logFailed = (dispatch: any, error: string) => {
    dispatch({
        type: ACTION_TYPES.FAILED_TO_LOG,
        msg: error,
    })
}

const logSucceed = (dispatch: any) => {
    dispatch({
        type: ACTION_TYPES.LOG_SUCCESS,
    })
}
