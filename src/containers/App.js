import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Home from './Home'
import Admin from './Admin'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "../context/auth";


// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71

function App (props) {
    // const[authTokens, setAuthTokens] = useState();

    // const setTokens = (data) => {
    //     localStorage.setItem("tokens", JSON.stringify(data));
    //     setAuthTokens(data);
    // }
//{authTokens, setAuthTokens: setTokens}
    return(
        <AuthContext.Provider value={false}>
            <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin Page</Link>
                    </li>
                </ul>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/admin" component={Admin} />
            </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;