import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import girlsLogin from './components/girlsLogin.PNG';
import "./index.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>

      <div className='hero'>
        <img align="center" id='Loginto' src={girlsLogin} alt="Login" />
      </div>

      <div className="loginPage">
        <form onSubmit={handleLogin}>
          <label>
            <input name="email" className="loginBtn" type="email" placeholder="Email" />
          </label>
          <label>
            <input name="password" className="loginBtn" type="password" placeholder="Password" />
          </label>
          <br></br>
          <div className="centerBtn">
            <button type="submit" className="close">Let's Go Girl</button>
          </div>
          <br></br>
          <p align="center">Need to sign up? <a className="signUp" href="./signup">Sign up Here!</a></p>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);