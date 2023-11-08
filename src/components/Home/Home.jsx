import {useState, useEffect} from 'react';
import "./Home.css"
import Category from "../Category/Category"
import Header from "../Header/Header"
import Navbar from '../NavBar/Navbar';
import Loader from "../Loader/Loader"

import { onAuthStateChanged } from 'firebase/auth'; //pour le logout et éviter que quelqu'un accède directement à la page en modifiant l'API sans être connecté
import { auth } from '../Firebase/firebase';
import { useNavigate } from "react-router-dom"

import { getDoc } from 'firebase/firestore'; //pour récupérer la data de l'utilisateur dans notre base de données
import { user } from '../Firebase/firebase';

const Home = () => {

    const navigate = useNavigate()
    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({}) //on crée un objet car c'est comme ca qu'est stockée la data dans la base de données

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user) => {
            user ? setUserSession(user) : navigate("/") 
        })

        if(userSession !== null) {
            const colRef = user(userSession.uid)//permet de récupérer l'id sur la db, en utilisant user() ca nous permet ensuite de le passer dans getDoc pour récupérer les données en fonction de cet id
            getDoc(colRef)
            .then((userObject) => {
                if (userObject.exists()) { //doc possède une méthode exists qui renvoie si de la data existe ou pas
                    const docData = userObject.data() //objet
                        console.log("1", userData)
                        setUserData(docData)  
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
        return listener //ici on pourrait travailler sans la const listener, mais comme on est dans un observateur on la crée au cas ou on voudrait arreter ensuite cette fonction dans un return()=>, ou s'en servir pour autre chose
    },[userSession])

    return userSession === null ? (
        <Loader />
    ) :
    (
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