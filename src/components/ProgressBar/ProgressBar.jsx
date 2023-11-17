import "./progressBar.css"
// import ProgressBar from 'react-bootstrap/ProgressBar';
import React from "react"
import dbzPicture from "../../img/category/dbz.jpg"
import marvelPicture from "../../img/category/marvel.webp"
import cyberpunkPicture from "../../img/category/cyberpunk.webp"

const ProgressBar = ({maxQuestions, idQuestion, quizEnd, nameCategory}) => {

    const getProgressionPercentage = (maxQuestions, idQuestion) => {
        
        if (quizEnd) {
            return 100
        }
        const percent = (idQuestion) / maxQuestions * 100
        return percent
    }

    const percentage = getProgressionPercentage(maxQuestions, idQuestion)

    const getPicture = (category) => {

        switch (category) {
            case "dbz" : 
            return dbzPicture
            case "marvel" : 
            return marvelPicture
            case "cyberpunk" : 
            return cyberpunkPicture
        }
    }

    return (
        <div className="progressBar" style={{ backgroundImage:`url("${getPicture(nameCategory)}")`}}>

            <div className="progress_cont">
                <div className="progress_box">{`${nameCategory.toUpperCase()}`}</div>
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
export default React.memo(ProgressBar)
