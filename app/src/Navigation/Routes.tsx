import GlobalMap from '../Containers/GlobalMap';
import Login from '../Containers/Login';
import Signup from '../Containers/Signup';
import Map from '../Containers/GlobalMap';

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
        component: Map
    }
];

export default Routes;