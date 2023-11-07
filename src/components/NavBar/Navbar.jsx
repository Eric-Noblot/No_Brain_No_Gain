import "./navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="home_link">ACCUEIL</Link>
            <ul className="navUl">
                <li className="navLi">Lien n°1</li>
                <li className="navLi">Lien n°2</li>
                <li className="navLi">Lien n°3</li>
            </ul>
        </nav>
    );
};

export default Navbar;