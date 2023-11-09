import "./navbar.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import LogOut from "../Logout/Logout"
import { GiBrainTentacle } from "react-icons/gi"

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
                {
                    navDisplay ? (
                        <>
                        <Link to="/home" className="home_link" title="Accueil"><GiBrainTentacle className="navLogo"/></Link>
    
                        <ul className="navUl">
                            <li className="navLi">Lien n°1</li>
                            <li className="navLi">Lien n°2</li>
                            <li className="navLi">Lien n°3</li>
                        </ul>
                        </>
                    )  : (
                        <Link to="/" className="home_link" title="Accueil"><GiBrainTentacle className="navLogo"/></Link>
                    )
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