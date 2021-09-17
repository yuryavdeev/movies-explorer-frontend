import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";

const SavedMovies = React.memo(() => {
    return (
        <div className="saved-movies">
            <Header />

        </div>
    )
});

export default SavedMovies;