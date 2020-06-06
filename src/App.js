import React, { useState } from 'react';
import Cookies from 'js-cookie';
import NotAuthenticatedUserScreen from './screens/NotAuthenticatedUserScreen.js';
import AuthenticatedUserScreen from './screens/AuthenticatedUserScreen.js';

function App() {
    let [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('email'));

    async function signIn(e) {
        e.preventDefault();
        await fetch('http://localhost:8083/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: e.target.email.value, pass: e.target.pass.value }),
        }).then((res) => res.json()).then((res) => {
            Cookies.set('id', res.cookie.value)
            Cookies.set('email', res.email)
            setIsLoggedIn(true);
        }).catch(() => {
            //redirect or show error message
        });
    }

    return isLoggedIn ? <AuthenticatedUserScreen userEmail={Cookies.get('email')} userToken={Cookies.get('id')} />
        : <NotAuthenticatedUserScreen signIn={signIn} />
}

export default App;
