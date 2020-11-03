import AbstractService from '../Ajax/AbstractService';
import apiRoot from '../.apiRoot';

class SignupService extends AbstractService {

    signUp(options: any) {
        return this.request({
            method: 'POST',
            url: apiRoot + 'register',
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
        }).catch(e => {
            console.log(e);
        });
    }
}

export default SignupService;