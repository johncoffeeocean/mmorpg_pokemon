import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
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

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failedUsername, setFailedUsername] = useState(false);
  const [failedPassword, setFailedPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onUsernameChange(e) {
    setUsername(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleCheckboxChange(e) {
    setChecked(e.target.checked);
  }

  async function createAccount() {
    setLoading(true);
    setFailedPassword(false);
    setFailedUsername(false);

    // const { username, password, email } = this.state;

    // Validate username length

    if (username.length < 3 || username.length > 32) {
      setFailedUsername(true);
      setLoading(false);
      setErrorMessage(
        "Your username must be at least 3 characters and can not be more than 32 characters."
      );
      return;
    }

    // Validate password length
    if (password.length < 5 || password.length > 256) {
      setFailedPassword(true);
      setLoading(false);
      setErrorMessage(
        "Your password must be at least 5 characters and can not be more than 256 characters."
      );
      return;
    }

    try {
      const response = await axios.post(`${config.serverApi}` + `register`, {
        username,
        password,
        email,
      });
      console.log("response", response);
      if (!response.data.error) {
        setLoading(false);
        setSuccess(true);
      } else {
        alert("Failed to send data.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setFailedUsername(true);
        setLoading(false);
        setErrorMessage(err.error);
      }
    }
  }

  return (
    // <Fragment>
    //   <div className="login_background"></div>
    //   <Grid
    //     textAlign="center"
    //     style={{ height: "80vh" }}
    //     verticalAlign="middle"
    //   >
    //     { success ? (
    //       <Grid.Column style={{ maxWidth: 450 }}>
    //         <Header as="h2" color="teal" textAlign="center">
    //           Account Registered!
    //         </Header>
    //         <Header as="h4" textAlign="center">
    //           Please check your email to verify your account.
    //         </Header>
    //       </Grid.Column>
    //     ) : (
    //       <Grid.Column style={{ maxWidth: 450, margin: "auto" }}>
    //         <Header
    //           as="h2"
    //           color="teal"
    //           style={{ backgroundColor: "white" }}
    //           textAlign="center"
    //         >
    //           {/* <Image src='/logo.png' />  */}
    //           Sign up for free!
    //         </Header>
    //         <Form size="large">
    //           <Segment stacked>
    //             {failedUsername ? (
    //               <div className="ui pointing below red basic label">
    //                 {errorMessage}
    //               </div>
    //             ) : null}
    //             <Form.Input
    //               autoFocus
    //               fluid
    //               icon="user"
    //               iconPosition="left"
    //               placeholder="Username"
    //               maxLength="32"
    //               value={username}
    //               onChange={onUsernameChange}
    //             />

    //             <Form.Input
    //               fluid
    //               icon="envelope"
    //               iconPosition="left"
    //               placeholder="Email"
    //               maxLength="32"
    //               value={email}
    //               onChange={onEmailChange}
    //             />

    //             {failedPassword ? (
    //               <div className="ui pointing below red basic label">
    //                 {errorMessage}
    //               </div>
    //             ) : null}
    //             <Form.Input
    //               fluid
    //               icon="lock"
    //               iconPosition="left"
    //               placeholder="Password"
    //               type="password"
    //               maxLength="256"
    //               value={password}
    //               onChange={onPasswordChange}
    //             />

    //             <Button
    //               className="orange_button"
    //               fluid
    //               size="large"
    //               disabled={loading}
    //               onClick={createAccount}
    //             >
    //               Sign Up
    //             </Button>
    //           </Segment>
    //         </Form>
    //         <Message>
    //           <p>
    //             Already have an account? &nbsp;
    //             <Link style={{ textDecoration: "none" }} to="/login">
    //               Log In
    //             </Link>{" "}
    //             <br />
    //             Didn't receive a verification email? &nbsp;
    //             <Link style={{ textDecoration: "none" }} to="/resend">
    //               Resend Verification
    //             </Link>
    //           </p>
    //         </Message>
    //       </Grid.Column>
    //     )}
    //   </Grid>
    // </Fragment>
    !success ? (
      <div className="container-text-middle-login">
        <div className="container-text-title-login">Create account</div>
        <div className="container-text-content-login">
          Create your profile and join the dreamland party.
        </div>

        <div className="container-login">
          <div className="touchstyle__CusInput-sc-qfeltw-4 bwZRcl">
            <span className="login-span">Username address</span>
            <br />
            <input
              type="text"
              autoFocus
              placeholder="Enter your username address"
              name="username"
              className="login_input"
              value={username}
              onChange={onUsernameChange}
            />
            <br />
          </div>
          <div className="touchstyle__CusInput-sc-qfeltw-4 bwZRcl">
            <span className="login-span">Email address</span>
            <br />
            <input
              type="text"
              autoFocus
              placeholder="Enter your email address"
              name="email"
              className="login_input"
              value={email}
              onChange={onEmailChange}
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
          onClick={createAccount}
        >
          Create Account
        </button>

        <div className="container-text-content-login">
          Already have account
          <Link className="login_span_reset" to="/login">
            Log In
          </Link>
        </div>
      </div>
    ) : (
      <div className="container-text-title-login">
        {" "}
        Successfully Registered{" "}
      </div>
    )
  );
};

export default Register;
