// // import React, { Component } from "react";
// // import { getSavedMovies } from "../utils/API";
// // import "../pagestyle.css";
// // import { getJWT } from "../helpers/jwt";
// import { Redirect } from "react-router-dom";

// // class NotLogged extends Component {
// //     state = {
// //         search: "",
// //         movieList: [],
// //         userToken: undefined
// //     }

// //     componentDidMount() {
// //         const jwt = getJWT();
// //         if (jwt) {
// //             this.props.history.push("/");
// //         }
// //         this.handleGetSavedMovies();
// //     }

// //     handleInputChange = (event) => {
// //         let searchTerm = event.target.value;
// //         this.setState({ search: searchTerm });
// //     }

// //     handleGetSavedMovies = () => {
// //         getSavedMovies()
// //             .then((res) => {
// //                 this.setState({ movieList: res.data })
// //             })
// //             .catch(err => console.log(err));
// //     }

// //     handleFormSubmit = event => {
// //         event.preventDefault();
// //         this.handleGetSavedMovies();
// //         this.setState({
// //             searchTerm: ""
// //         });
// //     };

// //     render() {

// //         let filteredMovies = this.state.movieList.filter((movie) => {
// //             return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
// //         });

// //         const jwt = getJWT();
// //         if (jwt) {
// //             return <Redirect to='/' />
// //         }

// //         return (
// //             <>
// //                 <HeaderNotLogged
// //                     handleGetSavedMovies={this.handleGetSavedMovies}
// //                     history={this.props.history}
// //                 />
// //                 <div className="top-flex-container">
// //                     <h1>Welcome to <span style={{ textDecoration: "underline", fontSize: "50px" }}>Review2gether</span></h1>
// //                     <p>Log-in to rate, review, and enjoy movies with your friends. Don't see your favorite movie here? Add it in yourself, and see what your buddies have to say!
// //                         You can filter through the list of available movies with the search bar here.
// //                     </p>
// //                     <form className="form">
// //                         <input
// //                             value={this.state.search}
// //                             onChange={this.handleInputChange}
// //                             type="text"
// //                             placeholder="Filter Movies"
// //                         />
// //                     </form>
// //                 </div>
// //                 {!this.state.movieList.length ? (
// //                     <div className="row">
// //                         <div className="col-sm-12">
// //                             <h1 className="text-center intro-text">There are no movies listed to here yet. To get started, click on the big "Add Movie" button at the top of the screen,
// //                                 and tell us what you like!
// //                             </h1>
// //                         </div>
// //                     </div>
// //                 ) : (
// //                     <div className="flex-container">
// //                         {filteredMovies.map(movie => {
// //                             return (
// //                                 <>
// //                                     <MoviePrintNotLogged
// //                                         key={movie._id}
// //                                         movieId={movie._id}
// //                                         background={movie.picture}
// //                                         title={movie.title}
// //                                         desc={movie.description}
// //                                         rating={movie.rating}
// //                                         comments={movie.comments}
// //                                         handleGetSavedMovies={this.handleGetSavedMovies}
// //                                     />
// //                                 </>
// //                             );
// //                         })}
// //                     </div>
// //                 )}
// //             </>
// //         );
// //     };


// // }


// // export default NotLogged;


// import HeaderNotLogged from "../components/HeaderNotLogged";
// import MoviePrintNotLogged from "../components/MoviePrintNotLogged";
// import React, { Component } from "react";
// import { getSavedMovies, getMoviesByGenre } from "../utils/API";

// import "../pagestyle.css";
// import { getJWT } from "../helpers/jwt";

// class NotLogged extends Component {
//     state = {
//         search: "",
//         genre: "",
//         selectedGenre: "", // Add selectedGenre state property
//         movieList: [],
//         userToken: undefined
//         // user: ""
//     };


//     componentDidMount() {
//         const jwt = getJWT();
//         if (jwt) {
//             this.props.history.push("/");
//         }
//         this.handleGetSavedMovies();
//     }

//     handleGenreChange = (event) => {
//         let selectedGenre = event.target.value;
//         this.setState({ selectedGenre }, () => {
//             this.handleGetSavedMovies();
//         });
//     };

//     handleInputChange = (event) => {
//         let searchTerm = event.target.value;
//         this.setState({ search: searchTerm });
//     }

//     handleGetSavedMovies = () => {
//         const { selectedGenre } = this.state;
//         console.log(selectedGenre)
//         if (selectedGenre) {
//             getMoviesByGenre(selectedGenre)
//                 .then((res) => {
//                     this.setState({ movieList: res.data });
//                 })
//                 .catch((err) => console.log(err));
//         } else {
//             getSavedMovies()
//                 .then((res) => {
//                     this.setState({ movieList: res.data });
//                 })
//                 .catch((err) => console.log(err));
//         }
//     };


//     handleFormSubmit = event => {
//         event.preventDefault();
//         this.handleGetSavedMovies();
//         this.setState({
//             searchTerm: ""
//         });
//     };

//     render() {
//         const { search, genre, movieList, user, selectedGenre } = this.state;
//         // if (Array.isArray(movieList)) {
//         //     // Use the filter method here
//         //     const filteredMovies = movieList.filter(/* your filter condition */);
//         //     // Continue with your code
//         //   } else {
//         //     // Handle the case where movieList is not an array
//         //     console.error('movieList is not an array');
//         //   }
          

//         let filteredMovies = movieList.filter((movie) => {
//             return (
//                 movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
//                 (selectedGenre !== "" && movie.genre.toLowerCase() === selectedGenre.toLowerCase())
//             );
//         });

//         const jwt = getJWT();
//         if (jwt) {
//             return <Redirect to='/' />
//         }

//         return (
//             <>
//                 <HeaderNotLogged handleGetSavedMovies={this.handleGetSavedMovies} history={this.props.history} />
//                 <div className="top-flex-container">
//                     <h1>
//                         Welcome to <span style={{ textDecoration: "underline", fontSize: "50px" }}>Review2gether</span>, {user}
//                     </h1>
//                     <p>
//                         Rate, review, and enjoy movies with your friends. Don't see your favorite movie here? Add it in yourself, and see what your buddies have to say! You can filter through the list of available movies with the search bar here.
//                         {selectedGenre && <span> Currently filtered by genre: {selectedGenre}</span>}
//                     </p>
//                     <form className="form">
//                         <input
//                             value={search}
//                             onChange={this.handleInputChange}
//                             type="text"
//                             placeholder="Filter Movies"
//                         />
//                         <select value={selectedGenre} onChange={this.handleGenreChange}>
//                             <option value="">Select a genre</option>
//                             <option value="action">Action</option>
//                             <option value="adventure">Adventure</option>
//                             <option value="comedy">Comedy</option>
//                             <option value="drama">Drama</option>
//                             <option value="fantasy">Fantasy</option>
//                             <option value="horror">Horror</option>
//                             <option value="romance">Romance</option>
//                             <option value="sci-fi">Sci-Fi</option>
//                             <option value="thriller">Thriller</option>

//                         </select>
//                     </form>
//                 </div>
//                 {!movieList.length ? (
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <h1 className="text-center intro-text">
//                                 There are no movies listed here yet. To get started, click on the big "Add Movie" button at the top of the screen and tell us what you like!
//                             </h1>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex-container">
//                         {filteredMovies.map((movie) => (
//                             <MoviePrintNotLogged
//                                 key={movie._id}
//                                 movieId={movie._id}
//                                 background={movie.picture}
//                                 title={movie.title}
//                                 desc={movie.description}
//                                 yt_link={movie.youtube}
//                                 rating={movie.rating}
//                                 comments={movie.comments}
//                                 genre={movie.genre}
//                                 handleGetSavedMovies={this.handleGetSavedMovies}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </>
//         );
//     }

// }


// export default NotLogged;



import React, { Component } from "react";
import { getSavedMovies, getMoviesByGenre } from "../utils/API";
import { Redirect } from "react-router-dom";
import "../pagestyle.css";
import { getJWT } from "../helpers/jwt";
import HeaderNotLogged from "../components/HeaderNotLogged";
import MoviePrintNotLogged from "../components/MoviePrintNotLogged";

class NotLogged extends Component {
  state = {
    search: "",
    genre: "",
    selectedGenre: "",
    movieList: [],
    userToken: undefined,
  };

  componentDidMount() {
    const jwt = getJWT();
    if (jwt) {
      this.props.history.push("/");
    }
    this.handleGetSavedMovies();
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
  };

//   handleGetSavedMovies = () => {
//     const { selectedGenre } = this.state;
//     if (selectedGenre) {
//       getMoviesByGenre(selectedGenre)
//         .then((res) => {
//           if (Array.isArray(res.data) && res.data.length > 0) {
//             this.setState({ movieList: res.data });
//           } else {
//             console.error("API response is not a non-empty array:", res.data);
//             // Handle the case when the response is not an array or is empty
//             this.setState({ movieList: [] }); // Set movieList to an empty array or handle it as needed
//           }
//         })
//         .catch((err) => console.log(err));
//     } else {
//       getSavedMovies()
//         .then((res) => {
//           if (Array.isArray(res.data) && res.data.length > 0) {
//             this.setState({ movieList: res.data });
//           } else {
//             console.error("API response is not a non-empty array:", res.data);
//             // Handle the case when the response is not an array or is empty
//             this.setState({ movieList: [] }); // Set movieList to an empty array or handle it as needed
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   };
handleGetSavedMovies = () => {
    const { selectedGenre } = this.state;
    if (selectedGenre) {
      getMoviesByGenre(selectedGenre)
        .then((res) => {
          console.log("Response from API:", res.data); // Add this line
          if (Array.isArray(res.data) && res.data.length > 0) {
            this.setState({ movieList: res.data });
          } else {
            console.error("API response is not a non-empty array:", res.data);
            this.setState({ movieList: [] });
          }
        })
        .catch((err) => console.log(err));
    } else {
      getSavedMovies()
        .then((res) => {
          console.log("Response from API:", res.data); // Add this line
          if (Array.isArray(res.data) && res.data.length > 0) {
            this.setState({ movieList: res.data });
          } else {
            console.error("API response is not a non-empty array:", res.data);
            this.setState({ movieList: [] });
          }
        })
        .catch((err) => console.log(err));
    }
  };  
  

  render() {
    const { search, movieList, selectedGenre } = this.state;

    let filteredMovies = movieList.filter((movie) => {
      return (
        movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        (selectedGenre !== "" && movie.genre.toLowerCase() === selectedGenre.toLowerCase())
      );
    });

    const jwt = getJWT();
    if (jwt) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <HeaderNotLogged handleGetSavedMovies={this.handleGetSavedMovies} history={this.props.history} />
        <div className="top-flex-container">
          <h1>Welcome to <span style={{ textDecoration: "underline", fontSize: "50px" }}>Review2gether</span></h1>
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
              <MoviePrintNotLogged
                key={movie._id}
                movieId={movie._id}
                background={movie.picture}
                title={movie.title}
                desc={movie.description}
                yt_link={movie.youtube}
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

export default NotLogged;
