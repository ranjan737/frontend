import axios from "axios";

export const saveMovie = movieData => {
  return axios.post("http://localhost:3001/api/movies", movieData);
}

export const getSavedMovies = () => {
  return axios.get("http://localhost:3001/api/movies");
}



// Function to fetch movies by genre
export const getMoviesByGenre = (genre) => {
  return axios.get(`http://localhost:3001/api/movies/?genre=${genre}`);
};


export const removeMovie = movieId => {
  return axios.delete(`http://localhost:3001/api/movies/${movieId}`);
}

export const updateMovie = (movieId, movieData) => {
  return axios.put(`http://localhost:3001/api/movies/${movieId}`, movieData);
}

export const saveUser = userData => {
  return axios.post("http://localhost:3001/api/users", userData);
}

export const getSavedUsers = () => {
  return axios.get("http://localhost:3001/api/users");
}

export const checkAuthUser = userData => {
  return axios.post("http://localhost:3001/api/auth", userData);
}

export default {
  saveMovie,
  getSavedMovies,
  removeMovie,
  updateMovie,
  saveUser,
  getSavedUsers,
  getMoviesByGenre
}