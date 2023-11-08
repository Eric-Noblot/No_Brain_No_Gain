import "./navbar.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import LogOut from "../Logout/Logout"

const Navbar = () => {

    const activePage = window.location.pathname
    const [navDisplay, setNavDisplay] = useState(false) 

    useEffect(() => {
        if (activePage ==="/signup" || activePage ==="/login" || activePage ==="/") {
            setNavDisplay(false)
        }
        else {
            setNavDisplay(true)
        }
    },[])

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="home_link">ACCUEIL</Link>
                {
                    navDisplay &&  
                    <ul className="navUl">
                        <li className="navLi">Lien n°1</li>
                        <li className="navLi">Lien n°2</li>
                        <li className="navLi">Lien n°3</li>
                    </ul>
                }
            </nav>
            {
                navDisplay &&
                <LogOut />
            }
        </>
    );
};

export default Navbar;