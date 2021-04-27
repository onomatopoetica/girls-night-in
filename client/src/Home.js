
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';
import GirlsNightIn from './components/GirlsNightIn.png';
import favorites from './components/favorites.png';
import app from "./base";
import "./index.css";
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
      data.movies?.forEach(({ title, poster, imdbID }) => {
        setState(prevState => {
          return { ...prevState, results: [...prevState.results, { Title: title, Poster: poster, imdbID: imdbID }] }
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

    console.log(state.selected);

    axios.post('/api/movies/' + currentUser.uid,
      {
        title: state.selected.Title,
        poster: state.selected.Poster,
        id: state.selected.imdbID
      }
    ).then((response) => {
      console.log(response.data);

      return window.location.reload(false);
    })
  }

  const favoriteDelete = () => {

    console.log(state.selected, "state selected");

    axios.delete('/api/movies/' + currentUser.uid,
      {
        data: {
          id: state.selected.imdbID
        }
      }
    ).then((response) => {
      console.log(response.data);

      return window.location.reload(false);
    })
  }

  return (

    <div className="App">

      <nav className="signOut" onClick={() => app.auth().signOut()}>Sign out</nav>

      <header>
        <div className='hero'>
          <img id='GNI' src={GirlsNightIn} alt="Girls' Night In Neon" />
        </div>
        <h1>Search For A Movie!</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <div className='hero'>
          <img id='favorites' src={favorites} alt="Favorites In Neon" />
        </div>

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title !== "undefined") ? <Popup selected={state.selected} closePopup={closePopup} favorite={favorite} favoriteDelete={favoriteDelete} /> : false}

      </main>
    </div>
  );
}

export default Home;