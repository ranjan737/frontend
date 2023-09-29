import React from 'react';
import StarRating from './StarRating';
import '../pagestyle.css';
import CommentsModal from "./CommentsModal";
import CommentsModalNotLogged from "./CommentsModalNotLogged";
import { removeMovie } from "../utils/API";
import { Link } from 'react-router-dom';

function MoviePrint(props) {
    function handleRemoveMovie(movieId) {
        removeMovie(movieId)
            .then(props.handleGetSavedMovies)
            .catch(err => console.log(err));
    }

    let totalRating = 0;
    for (let number of props.rating) {
        totalRating += +number;
    }

    let averageRating = (totalRating / props.rating.length).toFixed(2);
    if (isNaN(averageRating)) {
        averageRating = 0;
    }

    return (
        <div className="movie-flex-container" style={{
            background: `linear-gradient(
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.55)
          ), url(${props.background}) center`,
            WebkitBackgroundSize: "cover",
            MozBackgroundSize: "cover",
            OBackgroundSize: "cover",
            backgroundSize: "cover"
        }}
        // onClick={() => window.open(props.yt_link, "_blank")}
        >
            {/* <a href={props.yt_link} target="_blank" >
                <h1 className="movie-title">{props.title}</h1>
            </a> */}
            <h1 className="movie-title">{props.title}</h1>
            <p className="movie-desc">{props.desc}</p>
            <p className="movie-rating">
                Your friends have rated this movie
                <StarRating rating={averageRating} /> {/* Display star rating */}
                on average.
            </p>
            {!(localStorage.getItem(`${props.title}`)) ? (
                <CommentsModal
                    title={props.title}
                    movieId={props.movieId}
                    handleGetSavedMovies={props.handleGetSavedMovies}
                    comments={props.comments}
                />
            ) : (
                <CommentsModalNotLogged
                    movieId={props.movieId}
                    handleGetSavedMovies={props.handleGetSavedMovies}
                    comments={props.comments}
                />
            )}

            {/* <button className="remove-movie" onClick={() => handleRemoveMovie(props.movieId)}>X</button> */}
            <br></br>
            <div onClick={() => window.open(props.yt_link, "_blank")}
                style={{
                    border: "2px solid red",

                    borderRadius: "15px",
                    padding: "2px 5px",
                    margin: "0px",
                    color: "red",
                    cursor: "pointer",
                    display: "inline-block",
                    backgroundColor: "rgba(128, 128, 128, 0.5)",
                    background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                }}>
                <h4 style={{ margin: "0px" }}>TRAILER</h4>
            </div>

        </div>

    );
};

export default MoviePrint;
