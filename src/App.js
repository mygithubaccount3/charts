import React, { useState } from 'react';
import AuthenticatedUserScreen from './screens/AuthenticatedUserScreen.js';
import NotAuthenticatedUserScreen from './screens/NotAuthenticatedUserScreen.js';

function App() {
    let [isLogged, setIsLogged] = useState(false);

    function login() {
        setIsLogged(true);
    }

    return isLogged ? <AuthenticatedUserScreen /> : <NotAuthenticatedUserScreen login={login} />
}

export default App;
