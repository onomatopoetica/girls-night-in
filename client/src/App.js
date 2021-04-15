import React, { useState } from 'react';
// import axios from 'axios';
// import Search from './components/Search';
// import Results from './components/Results';
// import Popup from './components/Popup';
// import GNI from './components/GNI.png';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
console.log(process.env.REACT_APP_OMDB_API_KEY);

function App() {
  // const [state, setState] = useState({
  //   searchInput: "",
  //   results: [],
  //   selected: {}
  // });

  // const apiurl = 'http://www.omdbapi.com/?apikey=6d71121d';

  // const search = (e) => {
  //   if (e.key === "Enter") {
  //     axios(apiurl + "&s=" + state.searchInput).then(({ data }) => {
  //       let results = data.Search;

  //       setState(prevState => {
  //         return { ...prevState, results: results }
  //       })
  //     });
  //   }
  // }

  // const handleInput = (e) => {
  //   let searchInput = e.target.value;

  //   setState(prevState => {
  //     return { ...prevState, searchInput: searchInput }
  //   });
  // }

  // const openPopup = id => {
  //   axios(apiurl + "&i=" + id).then(({ data }) => {
  //     let result = data;

  //     console.log(result);

  //     setState(prevState => {
  //       return { ...prevState, selected: result }
  //     });
  //   });
  // }

  // const closePopup = () => {
  //   setState(prevState => {
  //     return { ...prevState, selected: {} }
  //   });
  // }

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
    // <div className="App">
    //   <header>
    //     <div className='hero'>
    //       <img id='GNI' src={GNI} alt="Girl's Night In Neon" />
    //     </div>
    //     <h1>Search For A Movie!</h1>
    //   </header>
    //   <main>
    //     <Search handleInput={handleInput} search={search} />

    //     <Results results={state.results} openPopup={openPopup} />

    //     {(typeof state.selected.Title !== "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}

    //   </main>
    // </div>
  );
}

export default App;
