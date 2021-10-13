import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUserContext'


function ProtectedRoute({ ...props }) {

    const currentUser = React.useContext(CurrentUser)

    return (
        <Route>
            {!currentUser ? <props.component {...props} /> : <Redirect to='/' />}
        </Route>
    );
};

export default ProtectedRoute;