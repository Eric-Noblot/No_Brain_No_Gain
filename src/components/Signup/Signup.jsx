import Navbar from "../NavBar/Navbar";
import "./signup.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebase"
import { setDoc } from "firebase/firestore"

const Signup = () => {

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if  (pseudoValidity(userData.pseudo) && emailValidity(userData.email)
            && passwordValidity(userData.password, userData.confirmPassword)) {

            createUserWithEmailAndPassword(auth, userData.email, userData.password)

            //création de l'utilisateur dans la base de données
            .then( authUser => {
                return setDoc(user(authUser.user.uid), {
                    pseudo: userData.pseudo,
                    email: userData.email
                })
            })
            .then(() => {
                setUserData({...userData}) //ici on récupére le contenu de loginData qu'on ECRASE et REMPLACE par data, qui est le state initial de notre état (chaine de caractere vide). Car pour la const signUp, nous ne voulons dans l'objet loginData que l'email et le password
                navigate("/home") //une fois l'utlisateur inscrit, on le redirige vers la page welcome grace au hook useNavigate()
            })
            .catch(error => {
                setError("Utilisateur déjà inscrit!")
                setUserData({...userData}) //dans le cas d'une erreur, on efface les valeurs qui se trouvent dans le State
            })
        }
    }

    //gestion des erreurs 
    const errorMsg = error !== "" && <span className="errorMsg">{error}</span> //si error Msg n'est pas à blanc, alors on ajoute un message. sinon notre errorMsg s'arretera ave le &&

    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value}) //Si on veut créer une variable à la place d'une valeur d'entrée dans un objet, on doit le placer entre []
        setError("")
    }


    // ---------------------
    // GESTION DES REGEX

const pseudoValidity = (pseudo) => {

    const regex = /^[a-zA-Z0-9-çàéèêîô\s,.'-]{3,}$/; // accepte 3 caractères minimum
    if (pseudo == "") {
        setError("Le pseudo est vide !")
        return;
    } else if (regex.test(pseudo) === false) {
        setError("Pseudo non valide")
        return;
    } else {
        setError("")
        return true;
    }
}

const emailValidity = (email) => {

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "") {
        setError("L'adresse email n'est pas valide !")
        return;
    } else if (regex.test(email) === false) {
        setError("Le format de l'email n'est pas valide !")
        return;
    } else {
        setError("")
        return true;
    }
}

const passwordValidity = (password, confirmPassword) => {
    if (password.length > 5 && confirmPassword.length > 5) {
        if (password === confirmPassword) {
            setError("")
            return true
        } else {
            setError("Les deux mots de passe ne correspondent pas...")
        }
    } else {
        setError("Le mot de passe doit contenir au moins 6 caractères !")
    }
}


    return (
        <>
        <Navbar />
            <div className = "bgSignup">
            {errorMsg}
                <form onSubmit = {handleSubmit} className ="signup_form">
                    <label htmlFor="pseudo" className="form_title">Pseudo :</label>
                    <input onChange={handleChange} id="pseudo" className = "form_input" type="text"></input>
                    <label htmlFor="email" className="form_title">Email :</label>
                    <input onChange={handleChange} id="email" className = "form_input" type="text"></input> {/*//ici je mets type="text" au lieu de type="email" car je veux gérer moi meme la validation avec un regex. Sinon react naffiche pas mon message quand l'adresse mail n'est pas valide car il est prioritaire sur ma vaildation*/}
                    <label htmlFor="password" className="form_title">Mot de passe:</label>
                    <input onChange={handleChange} id="password" className = "form_input" type="password"></input>
                    <label htmlFor="confirmPassword" className="form_title">Confirmez le mot de passe:</label>
                    <input onChange={handleChange} id="confirmPassword" className = "form_input" type="password"></input>
                    <input id="signup_submit" className = "form_input" type="submit" value="INSCRIPTION"></input>
                </form>
                

                <Link to ="/login" className ="form_btn">Déjà inscrit ? Connecte-toi</Link>
            </div>
        </>
    );
};

export default Signup;