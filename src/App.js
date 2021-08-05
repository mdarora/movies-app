import React, {useState, useEffect, useRef} from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import movieIcon from "./images/movie-icon.svg";
import './App.css';

export const API_KEY = '29013b';
export const API_URL = " http://www.omdbapi.com/?"

const App = () => {

  const [moviesList, setMoviesList] = useState([]);

  const moviesSection = useRef();
  const noMoviesSection = useRef();

  const getMovies = async (value) => {
    const requestUrl = `${API_URL}s=${value}&apikey=${API_KEY}`;

    const res = await fetch(requestUrl,{
      method: "GET"
    });
    const data = await res.json();

    if (data.Response === "True") {
      setMoviesList(data.Search);
    } else {
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

        <section ref={moviesSection} className="movies">
          {moviesList.length !== 0 ? moviesList.map((movie, index) => (
            <Movie 
              key={index}
              title={movie.Title}
              year={movie.Year}
              type={movie.Type}
              poster={movie.Poster}
              id={movie.imdbID}
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
