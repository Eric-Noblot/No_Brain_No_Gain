import "./progressBar.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import React from "react"

const ProgressBar1 = ({maxQuestions, idQuestion, quizEnd, nameCategory}) => {

    const getProgressionPercentage = (maxQuestions, idQuestion) => {
        
        if (quizEnd) {
            return 100
        }
        const percent = (idQuestion) / maxQuestions * 100
        return percent
    }

    const percentage = getProgressionPercentage(maxQuestions, idQuestion)

    return (
        <div className="progressBar">

            <div className="progress_cont">
                <div className="progress_box">{`--> ${nameCategory.toUpperCase()}`}</div>
                <div className="progress_box">{`Question: ${idQuestion +1 }/${maxQuestions}`}</div>
            </div>

            <div className="progressBar_cont">
                <div className="progressBar_box">
                    <div className = "progressBarLine" style={{width: `${percentage}%`}}></div>
                    {/* < ProgressBar now={`${percentage}`} animated variant="danger" className="progressBarLine"/> */}
                </div>
            </div>
        </div>
    );
};

// export default ProgressBar1
export default React.memo(ProgressBar1)
