import "./connexion.css"
import { Link } from "react-router-dom"
import Navbar from "../NavBar/Navbar"

const Connexion = () => {
    return (
        <>
            <Navbar />
            <div className = "bgConnexion">
                <div className="boxConnexion leftBoxConnexion">
                    <Link to="/login" className ="btnConnexion">LOGIN</Link>
                </div>
                <div className="boxConnexion rightBoxConnexion">
                    <Link to="/signup" className ="btnConnexion">SIGNUP</Link>
                </div>
            </div>
         </>
    );
};

export default Connexion;