import "./quiz.css"
import Navbar from "../NavBar/Navbar";
import Level from "../Level/Level";
import BarLevel from "../BarLevel/BarLevel";

const Quiz = () => {

    const handleClick = (e) => {
        console.log(e.target.value)
    }

    return (
        <div>
            <Navbar />
            <Level />
            <BarLevel />
            
            <div className = "questionCont">
                <div className = "questionBox">
                    <p className="question">Que fait l'autruche sur la montagne ?</p>
                    <ul>
                        <li onClick={handleClick} className="answer">1 - Réponse 1</li>
                        <li className="answer">2 - Réponse 2</li>
                        <li className="answer">3 - Réponse 3</li>
                        <li className="answer">4 - Réponse 4</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Quiz;