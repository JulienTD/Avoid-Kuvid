import GlobalMap from '../Containers/GlobalMap';
import Login from '../Containers/Login';
import Signup from '../Containers/Signup';
import Map from '../Containers/GlobalMap';
import Booking from '../Containers/Booking';

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
    },
    {
        name: "Booking",
        component: Booking
    }
];

export default Routes;