import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Reg from '../components/Registration';

function NotAuthenticatedUserScreen({ signIn }) {
    return (
        <Router>
            <Switch>
                <Route path="/reg">
                    <Reg />
                </Route>
                <Route path="/">
                    <Fragment>
                        <h1 style={{ textAlign: 'center' }}>Sign In</h1>
                        <form id="authForm" onSubmit={signIn}>
                            <label>
                                Email: <input type="email" name="email" placeholder="Enter email" />
                            </label>
                            <label>
                                Password: <input type="password" name="pass" placeholder="Enter password" />
                            </label>
                            <Link to="/reg">Sign Up</Link>
                            <button type="submit">Sign In</button>
                        </form>
                    </Fragment>
                </Route>
            </Switch>
        </Router>
    )
}

export default NotAuthenticatedUserScreen;
