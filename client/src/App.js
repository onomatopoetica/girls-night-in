import React, { useState } from 'react';

//console.log(process.env.REACT_APP_API_KEY);
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
//console.log(process.env.REACT_APP_OMDB_API_KEY);


function App() {
  
  return (
     <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  
  );
}

export default App;
