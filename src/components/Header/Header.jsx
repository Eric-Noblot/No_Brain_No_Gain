import "./header.css"
import { GiAnimalSkull } from"react-icons/gi"

const Header = () => {
    return (
        <header  className="header">
             
            <div className="header__logo">
                {/* <GiAnimalSkull size="80px" color="gold"/> */}
                {/* <h1>NO PAIN NO GAIN</h1> */}
                {/* <GiAnimalSkull size="80px" color="gold"/> */}
                <div className="bgHeader">
                    <h1>NO BRAIN <span className="nogain">NO GAIN</span></h1>
                </div>
            </div>
            {/* <div className = "header__logout"> */}
               
            {/* </div> */}
            
        </header>
    );
};

export default Header;