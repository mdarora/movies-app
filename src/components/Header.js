import React, {useState} from 'react';
import movieIcon from "../images/movie-icon.svg";
import searchIcon from "../images/search-icon.png";

const Header = (props) => {

    const [searchValue, setSearchValue] = useState("");

    const searchMovie = (e) => {
        e.preventDefault();
        props.getMovies(searchValue);
    }

    return (
    <>
        <header>
            <div className="header-app-name">
                <span className="header-icon">
                    <img src={movieIcon} alt="movies icon" />
                </span>
                <a href="/movies-app"><h3>Movies App</h3></a>
            </div>
            <div className="header-search-form">
                <form onSubmit={searchMovie}>
                    <input type="text" onChange={e => setSearchValue(e.target.value)} placeholder="Search movie" value={searchValue} />
                    <button disabled={!searchValue} type="submit">
                        <img src={searchIcon} alt="Search icon" />
                    </button>
                </form>
            </div>
        </header>
    </>
    )
}

export default Header
