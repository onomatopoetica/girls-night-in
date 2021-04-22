import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import SignPhoto from './components/Signpho.JPG';
import "./index.css";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      <div className='hero'>  
        <img id='SignPhoto' src={SignPhoto} alt="SignPhoto" />
      </div>
      
      <div className="signUpPage">
       <form onSubmit={handleSignUp}>
        <label>
          
          <input name="email" className="loginBtn" type="email" placeholder="Email" />
        </label>
        <label>
          
          <input name="password" className="loginBtn" type="password" placeholder="Password" />
        </label>
        <br></br>
        <div className="centerBtn">
        <button type="submit" className="close">Sign Up</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
