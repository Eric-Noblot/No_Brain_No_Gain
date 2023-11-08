import "./logout.css"
import {useEffect, useState} from 'react';
import { signOut } from "firebase/auth"
import { auth } from "../Firebase/firebase"
import { useNavigate } from "react-router-dom"

const Logout = () => {

    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (checked) {
            signOut(auth)
            .then(() => {
                console.log("Vous êtes déconnecté")
                navigate("/")
            })
            .catch((error) => {
                console.log("Erreur")
            })
        }
    },[checked])

    const handleChange = () => {
    setChecked(true)
    }

    return (
        <div className="logout">
            <label className="switch" title="Déconnection">
                <input onChange ={handleChange} type="checkbox" checked={checked}/>
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default Logout;