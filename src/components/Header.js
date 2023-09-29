import React from "react";
import "../pagestyle.css";
import AddMovieModal from "./AddMovieModal";
import RegisterModal from "./RegisterModal";

function Header(props) {

    function logout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <nav className="nav header-custom">
                <div className="header-title">
                    Review2gether
                </div>
                <AddMovieModal
                    handleGetSavedMovies={props.handleGetSavedMovies}
                />
                <button className="btn btn-info header-button" onClick={() => logout()}>
                    Log-out
                </button>
                <RegisterModal
                    handleGetSavedMovies={props.handleGetSavedMovies}
                />
            </nav>
        </>
    );
};



export default Header;