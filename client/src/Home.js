
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';
import GNI from './components/GNI.png';
import app from "./base";
import "./index.css";
import Favorites from "./components/Favorites";
import { AuthContext } from './Auth.js';




console.log(process.env.REACT_APP_API_KEY);

function Home() {
  const [state, setState] = useState({
    searchInput: "",
    results: [],
    selected: {},
    redirect: null
  });

  const { currentUser } = useContext(AuthContext);

  const apiurl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

  const search = (e) => {
    if (e.key === "Enter") {
      axios.get(apiurl + "&s=" + state.searchInput).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const getMovies = () => {
    axios("/api/user/" + currentUser.uid).then(({ data }) => {
      console.log(data, 'getmovies');
      data.movies?.forEach(({ title, poster }) => {
        setState(prevState => {
          return { ...prevState, results: [...prevState.results, { Title: title, Poster: poster }] }
        })
      })
    });
  }

  const handleInput = (e) => {
    let searchInput = e.target.value;

    setState(prevState => {
      return { ...prevState, searchInput: searchInput }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  // eslint-disable-next-line 
  useEffect(() => { getMovies() }, [])

  //this function will save to the favorites page
  const favorite = () => {
    // console.log("vv this is what your favorite button needs to push to the API vv");
    console.log(state.selected);
    // console.log('vv this is what its actually pushing I think vv');
    // console.log(currentUser.uid);
    axios.post('/api/movies/' + currentUser.uid,
      {
        title: state.selected.Title,
        poster: state.selected.Poster,
        id: state.selected.imdbID
      }
    ).then((response) => {
      console.log(response.data);
      // return (<Redirect to exact path="/" component={Home} />);
      return window.location.reload(false);
    })
  }

  //this function will take you to the favorites page (Favorites.js)
  const favoritesPage = () => {
    console.log('this button will take you to the favorites page when it works but for now its printing the favorites array right below here');
    // axios.get("/api/user/:id").then(({ data }) => {
    //   console.log(data);
    // });
    axios.get('/api/user/:id/?results=all',
      state.selected
    )
      .then((response) => {
        console.log(response);
      })
  }

  return (

    <div className="App">
      {/* <button className="close" onClick={() => app.auth().signOut()}>Sign out</button> */}
      <nav className="signOut" onClick={() => app.auth().signOut()}>Sign out</nav>
      {/* <button className="close" onClick={() => app.auth().favoritesPage()}>Favorites</button> */}
      {/* <button className="close" onClick={() => favoritesPage()}>Favorites</button> */}
      <nav className="favorites" onClick={() => favoritesPage()}>Favorites</nav>
      <header>
        <div className='hero'>
          <img id='GNI' src={GNI} alt="Girl's Night In Neon" />
        </div>
        <h1>Search For A Movie!</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title !== "undefined") ? <Popup selected={state.selected} closePopup={closePopup} favorite={favorite} /> : false}

      </main>
    </div>
  );
}

export default Home;