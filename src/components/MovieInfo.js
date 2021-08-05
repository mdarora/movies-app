import React, { useEffect, useState, useRef } from 'react';
import InfoItem from './InfoItem';
import closeIcon from "../images/remove.png";
import {API_KEY, API_URL}  from "../App";

const MovieInfo = (props) => {

    const [info, setInfo] = useState({});

    const loading = useRef();

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

        // document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        getInfo();
    }, [props.movieId]);

    return (
    <>
        <div ref={loading} className="loading">
            <center>Loading....</center>
        </div>
        <section id="info"  className="info">
            <div className="close">
                <img src={closeIcon} alt="close icon" onClick={() => props.changeMovieId("")} />
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


            </div>
        </section>
    </>
    )
}

export default MovieInfo
