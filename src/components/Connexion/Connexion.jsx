import "./connexion.css"
import { Link } from "react-router-dom"
import Navbar from "../NavBar/Navbar"

const Connexion = () => {
    return (
        <>
            <Navbar />
            <div className = "bgConnexion">
                <p className="titleConnexion titleLeft">NO BRAIN</p>
                <div className="contConnexion">
                    <div className="boxConnexion leftBoxConnexion">
                        <Link to="/login" className ="btnConnexion">CONNEXION</Link>
                    </div>
                    <div className="boxConnexion rightBoxConnexion">
                        <Link to="/signup" className ="btnConnexion">INSCRIPTION</Link>
                    </div>
                </div>
                <p className="titleConnexion titleRight">NO GAIN</p>
            </div>
         </>
    );
};

export default Connexion;