import React from 'react';
import "./Home.css"
import Category from "../Category/Category"
import Header from "../Header/Header"
import Navbar from '../NavBar/Navbar';

const Home = () => {
    return (
        <>
        <Navbar />
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
            <div className="bgHome"></div>
        </>
    );
};

export default Home;