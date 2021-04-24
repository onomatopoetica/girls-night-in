import axios from "axios";
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
      const result = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
        createDBuser(result.user);
    } catch (error) {
      alert(error);
    }
  }, []);

  const createDBuser = (user) => {
    axios.post("/api/user", {name: user.email, firebaseID: user.uid}).then(()=>{
      history.push("/");
    })
  };

  return (
    <div>
      <div className='hero'>  
        <img id='SignPhoto' src={SignPhoto} alt="SignPhoto" />
      </div>
      
      <div className="signUpPage">
       <form onSubmit={handleSignUp}>
          {/* <label>
            <input name="name" className="loginBtn" type="text" placeholder="Name" />
          </label> */}
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
          <br></br>
        <p>Already signed up? <a href="./login">Login Here!</a></p>
        </form>
      </div>
      
    </div>
  );
};

export default withRouter(SignUp);
