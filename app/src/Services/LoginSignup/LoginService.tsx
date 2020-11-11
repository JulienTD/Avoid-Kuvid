import AbstractService from '../Ajax/AbstractService';
import apiRoot from '../.apiRoot';

class LoginService extends AbstractService {

    public logIn(options: any) {
        return this.request({
            method: 'POST',
            url: apiRoot + 'login',
            json: {
                password: options.password,
                email: options.mail
            },
        }).then(responseData => {
            if (responseData === null)
                return null;
            if (responseData.ok) {
                return responseData.json();
            }
            throw responseData.json();
        });
    }
}

export default LoginService;