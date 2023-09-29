import React, { Component } from "react";
import Header from "../components/Header";
import MoviePrint from "../components/MoviePrint";
import { getSavedMovies, getMoviesByGenre } from "../utils/API";

import "../pagestyle.css";
import { getJWT, getUser } from "../helpers/jwt";

class Homepage extends Component {
    state = {
        search: "",
        genre: "",
        selectedGenre: "", // Add selectedGenre state property
        movieList: [],
    };


    componentDidMount() {
        this.handleGetSavedMovies();
        const jwt = getJWT();
        if (!jwt) {
            this.props.history.push("/notlogged")
        }

        const jwtUser = getUser();
        if (jwtUser) {
            this.setState({ user: jwtUser });
        }
    }

    handleGenreChange = (event) => {
        let selectedGenre = event.target.value;
        this.setState({ selectedGenre }, () => {
            this.handleGetSavedMovies();
        });
    };

    handleInputChange = (event) => {
        let searchTerm = event.target.value;
        this.setState({ search: searchTerm });
    }

    handleGetSavedMovies = () => {
        const { selectedGenre } = this.state;
        console.log(selectedGenre)
        if (selectedGenre) {
            getMoviesByGenre(selectedGenre)
                .then((res) => {
                    this.setState({ movieList: res.data });
                })
                .catch((err) => console.log(err));
        } else {
            getSavedMovies()
                .then((res) => {
                    this.setState({ movieList: res.data });
                })
                .catch((err) => console.log(err));
        }
    };


    handleFormSubmit = event => {
        event.preventDefault();
        this.handleGetSavedMovies();
        this.setState({
            searchTerm: ""
        });
    };

    render() {
        const { search, genre, movieList, user, selectedGenre } = this.state;

        let filteredMovies = movieList.filter((movie) => {
            return (
                movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                (selectedGenre !== "" && movie.genre.toLowerCase() === selectedGenre.toLowerCase())
            );
        });

        return (
            <>
                <Header handleGetSavedMovies={this.handleGetSavedMovies} />
                <div className="top-flex-container">
                    <h1>
                        Welcome to <span style={{ textDecoration: "underline", fontSize: "50px" }}>Review2gether</span>, {user}
                    </h1>
                    <p>
                        Rate, review, and enjoy movies with your friends. Don't see your favorite movie here? Add it in yourself, and see what your buddies have to say! You can filter through the list of available movies with the search bar here.
                        {selectedGenre && <span> Currently filtered by genre: {selectedGenre}</span>}
                    </p>
                    <form className="form">
                        <input
                            value={search}
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="Filter Movies"
                        />
                        <select value={selectedGenre} onChange={this.handleGenreChange}>
                            <option value="">Select a genre</option>
                            <option value="action">Action</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="drama">Drama</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-Fi</option>
                            <option value="thriller">Thriller</option>

                        </select>
                    </form>
                </div>
                {!movieList.length ? (
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="text-center intro-text">
                                There are no movies listed here yet. To get started, click on the big "Add Movie" button at the top of the screen and tell us what you like!
                            </h1>
                        </div>
                    </div>
                ) : (
                    <div className="flex-container">
                        {filteredMovies.map((movie) => (
                            <MoviePrint
                                key={movie._id}
                                movieId={movie._id}
                                background={movie.picture}
                                yt_link={movie.youtube}
                                title={movie.title}
                                desc={movie.description}
                                rating={movie.rating}
                                comments={movie.comments}
                                genre={movie.genre}
                                handleGetSavedMovies={this.handleGetSavedMovies}
                            />
                        ))}
                    </div>
                )}
            </>
        );
    }

}


export default Homepage;

