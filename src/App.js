import React, {useState, useEffect, useRef} from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import MovieInfo from './components/MovieInfo';

import movieIcon from "./images/movie-icon.svg";
import './App.css';

export const API_KEY = '29013b';
export const API_URL = " http://www.omdbapi.com/?"

const App = () => {

  const [moviesList, setMoviesList] = useState([]);
  const [movieId, setMovieId] = useState("");

  const moviesSection = useRef();
  const noMoviesSection = useRef();

  const changeMovieId = (id) => {
    setMovieId(id)
  }

  const getMovies = async (value) => {
    setMovieId("");
    const requestUrl = `${API_URL}s=${value}&apikey=${API_KEY}`;

    const res = await fetch(requestUrl,{
      method: "GET"
    });
    const data = await res.json();

    if (data.Response === "True") {
      setMoviesList(data.Search);
    } else {
      alert(data.Error);
      console.log("error : ", data);
    }
  }

  useEffect(()=>{
    if(moviesList.length !== 0) {
      moviesSection.current.style.display = "flex";
      noMoviesSection.current.style.display = "none";
    } else {
      moviesSection.current.style.display = "none";
      noMoviesSection.current.style.display = "flex";
    }
  }, [moviesList]);
  return (
  <>
      <Header getMovies={getMovies}/>
      <main>

        {movieId && <MovieInfo movieId={movieId} changeMovieId={changeMovieId}/>}

        <section ref={moviesSection} className="movies">
          {moviesList.length !== 0 ? moviesList.map((movie, index) => (
            <Movie 
              key={index}
              title={movie.Title}
              year={movie.Year}
              type={movie.Type}
              poster={movie.Poster}
              id={movie.imdbID}
              changeMovieId={changeMovieId}
            />
          )) : <></>}
        </section>

        <section ref={noMoviesSection} className="no-movies">
          <img src={movieIcon} alt="Movie icon" />
        </section>
      </main>
  </>
  )
}

export default App
