import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import {
//   Segment,
//   Button,
//   Grid,
//   Form,
//   Header,
//   Message,
// } from "semantic-ui-react";
import axios from "axios";

import config from "../../config";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Verify login credentials using the given username/password combination
  async function getAccount(username, password) {
    // const { apiPath } = this.props;

    // Use /login API route to verify credentials
    const res = await axios.post(`${config.serverApi}` + `login`, {
      username,
      password,
    });

    if (!res.ok) {
      const errorMsg = await res.json();
      setErrorMsg(errorMsg);
    }
    return await res.json();
  }

  // This function is called when 'login' button is clicked
  async function login() {
    setLoading(true);
    setFailed(false);

    try {
      // Get a authentication token and user object using getAccount() function
      const res = await axios.post(`${config.serverApi}` + `login`, {
        username,
        password,
      });

      if (!res.data.token) {
        console.log("login failed");
        const errorMsg = await res.json();
        setFailed(true);
        setErrorMsg(errorMsg);
        return;
      }

      config.setUserToken(res.data.token);
      config.setUserInfo(res.data.user);
      alert("login scuess");
      navigate("/");
    } catch (err) {
      if (err.name !== "AbortError") {
        setLoading(false);
        setFailed(true);
      }
    }
  }

  function onUsernameChange(e) {
    setUsername(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    const userInfo = config.getUserInfo();
    if (userInfo && userInfo.id) {
      console.log("info", config.getUserInfo());
      navigate("/");
    }
  });

  return (
    // <Fragment>
    //   <div className="login_background"></div>
    //   <Grid
    //     textAlign="center"
    //     style={{ height: "80vh" }}
    //     verticalAlign="middle"
    //   >
    //     <Grid.Column style={{ maxWidth: 450, margin: "auto" }}>
    //       <Header
    //         as="h2"
    //         color="teal"
    //         textAlign="center"
    //         style={{ backgroundColor: "white" }}
    //       >
    //         {/* <Image src='/logo.png' />  */}
    //         Sign in to your account
    //       </Header>
    //       <Form size="large">
    //         <Segment stacked>
    //           {failed ? <p style={{ color: "red" }}>{errorMsg.msg}</p> : null}
    //           <Form.Input
    //             autoFocus
    //             fluid
    //             icon="user"
    //             iconPosition="left"
    //             placeholder="Username"
    //             maxLength="32"
    //             value={username}
    //             onChange={onUsernameChange}
    //           />

    //           <Form.Input
    //             fluid
    //             icon="lock"
    //             iconPosition="left"
    //             placeholder="Password"
    //             type="password"
    //             maxLength="256"
    //             value={password}
    //             onChange={onPasswordChange}
    //           />

    //           <Button
    //             className="orange_button"
    //             fluid
    //             size="large"
    //             disabled={loading}
    //             onClick={login}
    //           >
    //             Log In
    //           </Button>
    //         </Segment>
    //       </Form>
    //       <Message>
    //         <p>
    //           Don't have an account? &nbsp;
    //           <Link style={{ textDecoration: "underline" }} to="/register">
    //             Sign Up
    //           </Link>
    //         </p>
    //       </Message>
    //     </Grid.Column>
    //   </Grid>
    // </Fragment>
    <div className="container-text-middle-login">
      <div className="container-text-title-login">Welcome!</div>
      <div className="container-text-content-login">
        Log in and join the RPG Game
      </div>

      {failed ? (
        <p
          className="container-text-content-login"
          style={{ color: "#cf4a4a", marginTop: "1rem" }}
        >
          Incorrect username or password
        </p>
      ) : (
        ""
      )}
      <div className="container-login">
        <div className="touchstyle__CusInput-sc-qfeltw-4 bwZRcl">
          <span className="login-span">username</span>
          <br />
          <input
            type="text"
            autoFocus
            placeholder="Enter your uername"
            className="login_input"
            value={username}
            onChange={onUsernameChange}
          />
          <br />
        </div>
        <div className="touchstyle__CusInput-sc-qfeltw-4 bwZRcl">
          <span className="login-span">Password</span>
          <br />
          <input
            type="password"
            placeholder="Enter your Password"
            name="password"
            className="login_input"
            value={password}
            onChange={onPasswordChange}
          />
          <br />
        </div>
      </div>
      <button
        typeof="submit"
        className="login_button"
        disabled={loading}
        onClick={login}
      >
        Log in
      </button>

      <div className="container-text-content-login">
        Forgot password?
        <Link className="login_span_reset" to="/reset">
          Reset
        </Link>
      </div>
      <div className="container-text-content-login">
        Don’t have an account?
        {/* <span className="login_span_reset">Sign Up</span> */}
        <Link className="login_span_reset" to="/register">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
