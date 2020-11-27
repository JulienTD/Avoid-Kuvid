import Login from '../Containers/Login';
import Signup from '../Containers/Signup';
import GlobalMap from '../Containers/GlobalMap';
import Facility from '../Containers/Facility';
import News from '../Containers/News';

const Routes = [
    {
        name: 'Login',
        component: Login
    },
    {
        name: 'Signup',
        component: Signup
    },
    {
        name: 'GlobalMap',
        component: GlobalMap
    },
    {
        name: 'Facility',
        component: Facility
    },
    {
        name: 'News',
        component: News
    },
];

export default Routes;