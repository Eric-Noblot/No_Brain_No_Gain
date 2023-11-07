import "./login.css"
import Navbar from "../NavBar/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        if (user.email && user.password) {
            navigate("/home")
        }

    }

    const handleChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
     
    }
    return (
        <>
        <Navbar />
            <div className = "bgLogin">
                <h2 className="login_h2">Connection...</h2>
                <form onClick = {handleSubmit} className ="login_form">
                    <label htmlFor="email" className="login_title">Email :</label>
                    <input onChange={handleChange} className = "login_input" type="email" id="email"></input>
                    <label htmlFor="password" className="login_title">Mot de passe :</label>
                    <input onChange={handleChange} className = "login_input" type="password" id="password"></input>
                    <input id="login_submit" className = "login_input" type="submit" value="CONNECTION"></input>
                </form>
                <Link to ="/signup" className ="login_btn">s'inscrire...</Link>

            </div>
        </>
    );
};

export default Login;