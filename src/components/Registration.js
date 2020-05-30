import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

function Registration() {
    async function signUp(e) {
        e.preventDefault();
        const obj = {
            id: null,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            pass: e.target.pass.value
        }
        await fetch('http://localhost:8083/signUp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(obj),
        }).then((res) => console.log(res.json()));
    }

    return (
        <Fragment>
            <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
            <form id="regForm" onSubmit={signUp}>
                <label>
                    First Name: <input type="text" name="firstName" placeholder="Enter first name" />
                </label>
                <label>
                    Last Name: <input type="text" name="lastName" placeholder="Enter last name" />
                </label>
                <label>
                    Email: <input type="email" name="email" placeholder="Enter email" />
                </label>
                <label>
                    Password: <input type="password" name="pass" placeholder="Enter password" />
                </label>
                <button type="submit">Sign Up</button>
                <Link to="/">Sign In</Link>
            </form>
        </Fragment>
    )
}

export default Registration;
