import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Reg from './components/Registration';
import AuthenticatedUserScreen from './screens/AuthenticatedUserScreen.js';

function App() {
    let [userInfo, setUserInfo] = useState({ isLogged: false });

    async function signIn(e) {
        e.preventDefault();
        await fetch('http://localhost:8083/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: e.target.email.value, pass: e.target.pass.value }),
        }).then((res) => res.json()).then((res) => {
            //console.log(res);
            Cookies.set('id', res.cookie.value)
            Cookies.set('email', res.email)
            setUserInfo({ isLogged: true });
        //console.log(Cookies.get('id'))
        }).catch(() => {
            //redirect or show error message
        });
    }

    return userInfo.isLogged ? <AuthenticatedUserScreen userEmail={Cookies.get('email')} userToken={Cookies.get('id')} /> : (
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
                            {'Forgot password? Router here'}
                            <Link to="/reg">Sign Up</Link>
                            <button type="submit">Sign In</button>
                        </form>
                    </Fragment>
                </Route>
            </Switch>
        </Router>

    )
}

export default App;
