import AbstractService from '../Ajax/AbstractService';
import { IServerResponse } from '../Ajax/IServerResponse';
import { apiRoot } from '../apiRoot';

interface IEvent {
    start: string;
    end: string;
    title: string;
    summary: string;
    color?: string;
}

class BookingService extends AbstractService {

    public async fetchSchedule(facility: string): Promise<IEvent[]> {
        return [
            {
                start: '2017-09-07 10:00:00',
                end: '2017-09-07 11:00:00',
                title: 'Study room',
                summary: 'Room n°3423-1'
            }
        ]
    }

    public async bookFacility(name: string, from: string, to: string): Promise<string> {
        console.log(from);
        console.log(to);
        return Promise.resolve("");
        return this.request({
            method: 'POST',
            url: apiRoot + 'book_facility',
            json: {
                token: "",
                name,
                _from: from,
                to
            },
        }).then((responseData: Response | null) => {
            if (responseData == null)
                return Promise.reject();
            if (!responseData.ok)
                throw responseData.json();

            return responseData.json()
            .then((value: IServerResponse) => {
                if (value == null || !value.success)
                    Promise.reject(value);
                return value.message;
            });
        });
    }

}

export default BookingService;