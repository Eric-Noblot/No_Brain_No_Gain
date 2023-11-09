import "./connexion.css"
import { Link } from "react-router-dom"
import Navbar from "../NavBar/Navbar"
import { useEffect, useState } from "react"

const Connexion = () => {

    const [displayBtn, setDisplayBtn] = useState(false)

    useEffect(() => {

        setTimeout(() => {  
            setDisplayBtn(true)
            console.log("tesst")
        },"1800")

    },[])

    return (
        <>
            <Navbar />
            <div className = "bgConnexion">
                <p className="titleConnexion titleLeft">NO BRAIN</p>
                <div className="contConnexion">
                    {
                        displayBtn ? (
                            <>
                                <div className="boxConnexion leftBoxConnexion">
                                <Link to="/login" className ="btnConnexion">CONNEXION</Link>
                                </div>
                                <div className="boxConnexion rightBoxConnexion">
                                    <Link to="/signup" className ="btnConnexion">INSCRIPTION</Link>
                                </div>
                            </>
                        ) : <span className="space_keeper"></span>
                    }

                </div>
                <p className="titleConnexion titleRight">NO GAIN</p>
            </div>
         </>
    );
};

export default Connexion;