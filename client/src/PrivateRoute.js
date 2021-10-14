import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ isLoggedIn, ...props }) {
    if (isLoggedIn) {
        return <Route {...props} />
    } else {
        return <Redirect to="/" />
    }
}