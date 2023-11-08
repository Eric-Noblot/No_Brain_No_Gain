import "./header.css"
import { GiAnimalSkull } from"react-icons/gi"

const Header = () => {
    return (
        <header  className="header">
             
            <div className="header__logo">
                <GiAnimalSkull size="80px" color="gold"/>
                <h1>QUIZ</h1>
                <GiAnimalSkull size="80px" color="gold"/>
            </div>
            {/* <div className = "header__logout"> */}
               
            {/* </div> */}
        </header>
    );
};

export default Header;