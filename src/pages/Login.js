import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import logoImg from "../logo.svg";
import axios from 'axios';
import { useAuth } from "../context/auth";
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForm';

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const referer = props.location.state.referer || '/';

  function postLogin() {
    // fetch("https://stark-sea-06010.herokuapp.com/auth", 
    // {
    //   method: "POST",
    //     body: JSON.stringify({
    //       userName,
    //       password
    //     }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   }
    // )
    axios.post("https://stark-sea-06010.herokuapp.com/auth", {
      userName,
      password
    })
    .then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
        console.log("setLoggedIn-true")
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }
  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;