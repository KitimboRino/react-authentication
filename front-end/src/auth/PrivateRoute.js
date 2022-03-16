import { Redirect, Route } from 'react-router-dom';

// Importing custom hook
import { useUser } from './useUser';

export const PrivateRoute = props => {
    // Makes sure user accesses the route only if they are logged in
    const user = useUser();

    if (!user) return <Redirect to='/login'/>

    return <Route {...props}/>
}