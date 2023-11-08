import "./login.css"
import Navbar from "../NavBar/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase/firebase"

const Login = () => {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (emailValidity(email) && passwordValidity(password)) {
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setEmail("")
                setPassword("")
                navigate("/home", { replace: true}) //replace: true fait qu'on retire la page précédente de l'historique
            })
            .catch((error) => {
                setError("Problème d'identification, veuillez réessayer...")
                setEmail("")
                setPassword("")  
            })
        }

    }

    //gestion des erreurs 
    const errorMsg = error !== "" && <span className="errorMsg">{error}</span> //si error Msg n'est pas à blanc, alors on ajoute un message. sinon notre errorMsg s'arretera ave le &&

    //REGEX
    const emailValidity = (email) => {

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "") {
            setError("L'adresse email n'est pas valide !")
            return;
        } else if (regex.test(email) === false) {
            setError("Format d'adresse non valide !")
            return;
        } else {
            setError("")
            return true;
        }
    }
    
    const passwordValidity = (password) => {
        if (password.length > 5 ) {
            return true
        } else {
            setError("Le mot de passe doit contenir au moins 6 caractères !")
        }
    }
    return (
        <>
        <Navbar />
            <div className = "bgLogin">
                {errorMsg}
                <form onSubmit = {handleSubmit} className ="login_form">
                    <label htmlFor="email" className="form_title">Email :</label>
                    <input onChange={(e) => {
                        setEmail(e.target.value)
                        setError("")
                    }
                    } className = "form_input" type="text" id="email"></input>
                    <label htmlFor="password" className="form_title">Mot de passe :</label>
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                        setError("")
                    }} className = "form_input" type="password" id="password"></input>
                    <input id="login_submit" className = "form_input" type="submit" value="CONNECTION"></input>
                </form>
                <Link to ="/signup" className ="form_btn">s'inscrire...</Link>

            </div>
        </>
    );
};

export default Login;