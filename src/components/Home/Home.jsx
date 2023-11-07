import React from 'react';
import "./Home.css"
import Category from "../Category/Category"
import Header from "../Header/Header"

const Home = () => {
    return (
        <div className="home">

            <Header />
            <main className="main">
                <div>
                    Choisis la catégorie !
                </div>
                <Category />
            </main>
            <footer className="footer">
                footer
            </footer>

        </div>
    );
};

export default Home;