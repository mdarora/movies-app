import React, {useState, useEffect, useRef} from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import MovieInfo from './components/MovieInfo';

import movieIcon from "./images/movie-icon.svg";
import './App.css';

export const API_KEY = '29013b';
export const API_URL = " https://www.omdbapi.com/?"

const App = () => {

  const [moviesList, setMoviesList] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [searchValue, setSearchValue] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const moviesSection = useRef();
  const noMoviesSection = useRef();

  const changeMovieId = (id) => {
    setMovieId(id)
  }

  const getMovies = async (value, page) => {
    setMovieId("");
    let requestUrl;
    if (!page){
      setSearchValue(value);
      requestUrl = `${API_URL}s=${value}&apikey=${API_KEY}`;
    } else {
      requestUrl = `${API_URL}s=${value}&page=${page}&apikey=${API_KEY}`;
    }

    const res = await fetch(requestUrl,{
      method: "GET"
    });
    const data = await res.json();

    if (data.Response === "True") {
      setMoviesList(data.Search);
      setTotalPages(Math.floor(data.totalResults / 10) + 1);
    } else {
      alert(data.Error);
      console.log("error : ", data);
    }
  }

  const prevPage = () => {
    if(currentPage !== 1){
      getMovies(searchValue, currentPage-1);
      setCurrentPage(currentPage-1);
      document.documentElement.scrollTop = 0;
    } else {
      return;
    }
  }
  
  const nextPage = () => {
    if (currentPage !== totalPages){
      getMovies(searchValue, currentPage+1);
      setCurrentPage(currentPage+1);
      document.documentElement.scrollTop = 0;
    } else {
      return;
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
          
          {totalPages > 1 ? <>
            <div className="movies-pagination"> 
              <p>page</p>
              {currentPage !== 1 ? <button onClick={prevPage} title="Previous page">&laquo;</button> : ""}
              <span>{currentPage}</span>
              {currentPage !== totalPages ? <button onClick={nextPage} title="Next page">&raquo;</button> : ""}
              <p>of {totalPages}</p>
            </div>
          </> : ""}
        </section>

        <section ref={noMoviesSection} className="no-movies">
          <img src={movieIcon} alt="Movie icon" />
        </section>
        
      </main>
  </>
  )
}

export default App
