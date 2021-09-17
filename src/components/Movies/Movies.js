import React from "react";
import './Movies.css';
import Header from "../Header/Header";

const Movies = React.memo(() => {
    return (
        <div className="movies">
            <Header />

        </div>
    )
});

export default Movies;