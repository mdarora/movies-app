import React, {useState, useEffect, useRef} from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import MovieInfo from './components/MovieInfo';

// import movieIcon from "./images/movie-icon.svg";
import './App.css';

export const API_KEY = '29013b';
export const API_URL = " https://www.omdbapi.com/?"

const App = () => {

  const [moviesList, setMoviesList] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [searchValue, setSearchValue] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [localMovies, setLocalMovies] = useState([]);

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
      requestUrl = `${API_URL}s=${value}&page=1&apikey=${API_KEY}`;
      setCurrentPage(1);
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
    const savedMovies = JSON.parse(window.localStorage.getItem("myMovies"));
    if (savedMovies != null){
      setLocalMovies(savedMovies);
    }
  },[]);

  return (
  <>
      <Header getMovies={getMovies}/>
      <main>

        {movieId && <MovieInfo movieId={movieId} setLocalMovies={setLocalMovies} changeMovieId={changeMovieId}/>}

        {moviesList.length !== 0 ? <>
          <section ref={moviesSection} className="movies">
            {moviesList.map((movie, index) => (
              <Movie 
                key={index}
                title={movie.Title}
                year={movie.Year}
                type={movie.Type}
                poster={movie.Poster}
                id={movie.imdbID}
                changeMovieId={changeMovieId}
              />
            ))}
            
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

        </> : <>
        
          <section ref={noMoviesSection} className="no-movies">
            {localMovies.length === 0 ? <>
              <div>
                <p>No Saved Movies.</p>
                <p>Search for movies in search bar.</p>
              </div>
            </> : <>
            <h1 className='saved-head'>Your Saved Movies</h1>
              {localMovies.map((movie, index) => (
                <Movie 
                  key={index}
                  index={index}
                  title={movie.Title}
                  year={movie.Year}
                  type={movie.Type}
                  poster={movie.Poster}
                  id={movie.imdbID}
                  changeMovieId={changeMovieId}
                />))}
            </>
               }
          </section>

        </>}

        
      </main>
  </>
  )
}

export default App
