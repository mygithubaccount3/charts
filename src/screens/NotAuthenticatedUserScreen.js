import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Auth from '../components/Auth';
import Reg from '../components/Registration';

function NotAuthenticatedUserScreen({ login }) {
    return (
        <Router>
            <Switch>
                <Route path="/reg">
                    <Reg />
                </Route>
                <Route path="/">
                    <Auth login={login} />
                </Route>
            </Switch>
        </Router>
    )
}

export default NotAuthenticatedUserScreen;
