import React, { useRef, useState } from 'react'
import "../pagestyle.css";
import Modal from 'react-bootstrap/Modal';
import { saveMovie } from "../utils/API";

function NewMovieModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectedGenre, setSelectedGenre] = useState('');
    const titleRef = useRef();
    const ytRef = useRef();
    const pictureRef = useRef();
    const descriptionRef = useRef();
    const genreRef = useRef();

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const newMovie = {
            title: titleRef.current.value,
            picture: pictureRef.current.value,
            youtube: ytRef.current.value,
            description: descriptionRef.current.value,
            genre: genreRef.current.value
        };

        console.log(`Adding movie: ${newMovie}`);
        saveMovie(newMovie)
            .then(res => {
                console.log(res)
                props.handleGetSavedMovies();
            });

        handleClose();
    }

    return (
        <>
            <button className="btn btn-info header-button-add" style={{ margin: "0 auto" }} onClick={handleShow}>
                Add Movie
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: "#4C4E49", color: "white" }} closeButton>
                    <Modal.Title style={{ fontFamily: "'Roboto Slab', serif", fontSize: "30px" }}>Add Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#39AEC5", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px" }}>
                    <form>

                        <div className="form-group text-center">
                            <label>Title: </label><br />
                            <input
                                className="input"
                                ref={titleRef}
                                type="text"
                                placeholder="Title"
                            />
                        </div>
                        <div className="form-group text-center">
                            <label>Picture URL: </label><br />
                            <textarea
                                rows="2"
                                className="input"
                                ref={pictureRef}
                                type="text"
                                placeholder="Picture URL"
                            />
                        </div>
                        <div className="form-group text-center">
                            <label>Youtube URL: </label><br />
                            <textarea
                                rows="2"
                                className="input"
                                ref={ytRef}
                                type="text"
                                placeholder="Youtube URL"
                            />
                        </div>
                        <div className="form-group text-center">
                            <label>Description: </label><br />
                            <textarea
                                rows="2"
                                className="input"
                                ref={descriptionRef}
                                type="text"
                                placeholder="Description"
                            />
                        </div>
                        <div className='form-group text-center'>
                            <label htmlFor="genre">Genre:</label>
                            <select id="genre" value={selectedGenre} onChange={handleGenreChange} ref={genreRef}>
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
                            <br></br>
                            <p>Selected Genre: {selectedGenre}</p>

                        </div>
                    </form>

                    <button className="btn btn-light header-button" style={{ margin: "0 auto" }} onClick={handleSubmit}>
                        Submit
                    </button>

                </Modal.Body>

            </Modal>
        </>
    );
}

export default NewMovieModal;