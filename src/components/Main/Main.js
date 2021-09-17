import React from "react";
import './Main.css';
import Header from "../Header/Header";
import Promo from "./Promo/Promo";

const Main = React.memo(() => {
    return (
        <div className="main">
            <Header />
            <Promo />

        </div>
    )
});

export default Main;