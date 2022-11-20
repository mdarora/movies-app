import React, { useEffect, useState, useRef } from 'react';
import InfoItem from './InfoItem';
import closeIconRed from "../images/cancel.png";
// import closeIconBlack from "../images/remove.png";
import {API_KEY, API_URL}  from "../App";

const MovieInfo = (props) => {

    const [info, setInfo] = useState({});
    const [isItInLocalStorage, setIsItInLocalStorage] = useState(false);

    const loading = useRef();

    const addMovieToLocal = () => {
        const prevLocalMovies = window.localStorage.getItem("myMovies");
        if(!prevLocalMovies){
            window.localStorage.setItem("myMovies", JSON.stringify([info]));
        } else {
            const jsonLocalMovies = JSON.parse(prevLocalMovies);
            if(jsonLocalMovies.filter( movie => movie.imdbID === info.imdbID).length === 0){
                jsonLocalMovies.unshift(info);
                window.localStorage.setItem("myMovies", JSON.stringify(jsonLocalMovies));
                setIsItInLocalStorage(true);
                props.setLocalMovies(jsonLocalMovies);
            }
        }
    }

    const removeMovieFromLocal = () => {
        const jsonLocalMovies = JSON.parse(window.localStorage.getItem("myMovies"));
        jsonLocalMovies.forEach((element, index) => {
            if (element.imdbID === info.imdbID){
                jsonLocalMovies.splice(index, 1);
            }
        });
        window.localStorage.setItem("myMovies", JSON.stringify(jsonLocalMovies));
        setIsItInLocalStorage(false);
        props.setLocalMovies(jsonLocalMovies);
    }

    useEffect(() => {
        const getInfo = async () =>{
            loading.current.hidden = false;
            document.getElementById("info").style.display = "none";

            const requestUrl = `${API_URL}i=${props.movieId}&apikey=${API_KEY}`;

            const res = await fetch(requestUrl, {
                method: "GET"
            });
            const data = await res.json();
    
            if(data.Response === "True") {
                loading.current.hidden = true;
                setInfo(data);
                document.getElementById("info").style.display = "flex";
            }
        };
        
        getInfo();
        setTimeout(() => {
            document.documentElement.scrollTop = 0;
        }, 100);
    }, [props.movieId]);

    useEffect(()=>{
        const jsonLocalMovies = JSON.parse(window.localStorage.getItem("myMovies"));
        if(jsonLocalMovies && jsonLocalMovies.filter( movie => movie.imdbID === info.imdbID).length > 0){
            setIsItInLocalStorage(true);
        } else {
            setIsItInLocalStorage(false);
        }
    }, [info]);

    return (
    <>
        <div ref={loading} className="loading">
            <center>Loading....</center>
        </div>
        <section id="info"  className="info">
            <div className="close">
                <img src={closeIconRed} alt="close icon" onClick={() => props.changeMovieId()} />
            </div>
            <div title={info.Title} className="info-poster">
                <img src={info.Poster} alt="" />
            </div>
            <div className="info-text">

                <div className="info-title">
                    <strong>{info.Type} : <span>{info.Title}</span></strong>
                </div>

                <InfoItem item="IMDB Rating" value={info.imdbRating}/>
                <InfoItem item="Year" value={info.Year}/>
                <InfoItem item="Released" value={info.Released}/>
                <InfoItem item="Runtime" value={info.Runtime}/>
                <InfoItem item="Rated" value={info.Rated}/>
                <InfoItem item="Genre" value={info.Genre}/>
                <InfoItem item="Director" value={info.Director}/>
                <InfoItem item="Awards" value={info.Awards}/>
                <InfoItem item="Languages" value={info.Language}/>
                <InfoItem item="Writer" value={info.Writer}/>
                <InfoItem item="Actors" value={info.Actors}/>
                <InfoItem item="Plot" value={info.Plot}/>

                {isItInLocalStorage ? 
                    <div className="remove-btn">
                        <button onClick={removeMovieFromLocal}>Unsave</button>
                    </div>
                    :
                    <div className="add-btn">
                        <button onClick={addMovieToLocal}>Save</button>
                    </div>
                }
            </div>
        </section>
    </>
    )
}

export default MovieInfo
