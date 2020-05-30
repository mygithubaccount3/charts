import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

function Auth({ login }) {
    async function signIn(e) {
        e.preventDefault();
        await fetch('http://localhost:8083/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: e.target.email.value, pass: e.target.pass.value }),
        }).then((res) => res.json()).then(() => {
            login();
        }).catch(() => {
            //redirect or show error message
        });
    }

    return (
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
    )
}
export default Auth;
