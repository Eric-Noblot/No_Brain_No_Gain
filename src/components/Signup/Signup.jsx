import Navbar from "../NavBar/Navbar";
import "./signup.css"
import { Link } from "react-router-dom"

const Signup = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <Navbar />
            <div className = "bgSignup">
                <h2 className="signup_h2">Inscription...</h2>
                <form onClick = {handleSubmit} className ="signup_form">
                    <label htmlFor="signup_pseuso" className="signup_title">Pseudo :</label>
                    <input id="signup_pseuso" className = "signup_input" type="text"></input>
                    <label htmlFor="signup_email" className="signup_title">Email :</label>
                    <input id="signup_email" className = "signup_input" type="email"></input>
                    <label htmlFor="signup_password" className="signup_title">Mot de passe:</label>
                    <input id="signup_password" className = "signup_input" type="password"></input>
                    <label htmlFor="signup_password_verif" className="signup_title">Confirmez le mot de passe:</label>
                    <input id="signup_password_verif" className = "signup_input" type="password"></input>

                    <input id="signup_submit" className = "signup_input" type="submit" value="INSCRIPTION"></input>
                </form>
                <Link to ="/login" className ="signup_btn">se connecter...</Link>
            </div>
        </>
    );
};

export default Signup;