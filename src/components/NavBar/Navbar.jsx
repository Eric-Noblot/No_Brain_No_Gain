import "./navbar.css"
import { Link } from "react-router-dom"
import { RiLogoutCircleRLine } from "react-icons/ri"

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="home_link">ACCUEIL</Link>
                <ul className="navUl">
                    <li className="navLi">Lien n°1</li>
                    <li className="navLi">Lien n°2</li>
                    <li className="navLi">Lien n°3</li>
                    
                </ul>
            </nav>
            <div className="navLogout">
                <RiLogoutCircleRLine  className="logoutBtn"/>
            </div>
            
        </>
    );
};

export default Navbar;