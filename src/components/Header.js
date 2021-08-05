import React from 'react';
import movieIcon from "../images/movie-icon.svg";
import searchIcon from "../images/search-icon.png";

const Header = () => {
    return (
    <>
        <header>
            <div className="header-app-name">
                <span className="header-icon">
                    <img src={movieIcon} alt="movies icon" />
                </span>
                <h3>React Movies App</h3>
            </div>
            <div className="header-search-form">
                <form>
                    <input type="text" placeholder="Search movie" />
                    <button type="submit">
                        <img src={searchIcon} alt="Search icon" />
                    </button>
                </form>
            </div>
        </header>
    </>
    )
}

export default Header
