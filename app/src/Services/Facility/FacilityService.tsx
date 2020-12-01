import Facility from '../../Containers/Facility';
import AbstractService from '../Ajax/AbstractService';
import { apiRoot } from '../apiRoot';

class FacilityService extends AbstractService {

    public logIn(options: any) {
        return this.request({
            method: 'POST',
            url: apiRoot + 'login',
            json: {
                token: options.token,
                email: options.email
            },
        }).then(responseData => {
            if (responseData === null)
                return null;
            if (responseData.ok) {
                return responseData.json().then((value : any) => {
                    if (value.success)
                        return value;
                    else
                        throw value;
                });
            }
            throw responseData.json();
        });
    }
}

export default FacilityService;