import "./progressBar.css"
// import ProgressBar from 'react-bootstrap/ProgressBar';
import React from "react"

import anglaisPicture from "../../img/category/anglais.jpg"
import animauxPicture from "../../img/category/animaux.jpg"
import bookPicture from "../../img/category/book.avif"
import cartoonPicture from "../../img/category/cartoon.jpg"
import cinemaPicture from "../../img/category/cinema.jpg"
import dbzPicture from "../../img/category/dbz.jpg"
import espacePicture from "../../img/category/espace.webp"
import francaisPicture from "../../img/category/francais.jpg"
import jeuxvideoPicture from "../../img/category/jeuxvideo.avif"
import marvelPicture from "../../img/category/marvel.webp"
import mathsPicture from "../../img/category/maths.jpg"
import musiquePicture from "../../img/category/musique.webp"
import naturePicture from "../../img/category/nature.jpg"
import planetePicture from "../../img/category/planete.jpg"
import sciencePicture from "../../img/category/science.jpg"
import simpsonsPicture from "../../img/category/simpsons.avif"
import sportPicture from "../../img/category/sport.jpg"
import voyagesPicture from "../../img/category/voyages.jpg"


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

            case "anglais" : 
            return anglaisPicture
            case "animaux" : 
            return animauxPicture
            case "book" : 
            return bookPicture
            case "cartoon" : 
            return cartoonPicture
            case "cinema" : 
            return cinemaPicture
            case "dbz" : 
            return dbzPicture
            case "espace" : 
            return espacePicture
            case "français" : 
            return francaisPicture
            case "jeux-vidéo" : 
            return jeuxvideoPicture
            case "marvel" : 
            return marvelPicture
            case "maths" : 
            return mathsPicture
            case "musique" : 
            return musiquePicture
            case "nature" : 
            return naturePicture
            case "planète" : 
            return planetePicture
            case "science" : 
            return sciencePicture
            case "simpsons" : 
            return simpsonsPicture
            case "sport" : 
            return sportPicture
            case "voyages" : 
            return voyagesPicture

            default :
            return "Error"
        }
    }

    return (
            <div className="progressBar">
                <div className="progress_cont">
                    <div className="progress_box progress_quiz">{`- ${nameCategory.toUpperCase()} -`}</div>
                    <div className="progress_box progress_question">{`Question: ${idQuestion +1 } / ${maxQuestions}`}</div>
                </div>

                <div className="progressBar_cont">
                    <div className="progressBar_box">
                        <div className = "progressBarLine" style={{width: `${percentage}%`}}></div>
                        {/* < ProgressBar now={`${percentage}`} animated variant="danger" className="progressBarLine"/> */}
                    </div>
                </div>
                <img className="progressBar_img" src={getPicture(nameCategory)} alt="background_img" />
                <div className = "dark_Background"></div>
            </div>
    );
};

// export default ProgressBar1
export default React.memo(ProgressBar)



// return (
//     <div className="progressBar" style={{ backgroundImage:`url("${getPicture(nameCategory)}")`}}>

//         <div className="progress_cont">
//             <div className="progress_box progress_quiz">{`QUIZ - ${nameCategory.toUpperCase()}`}</div>
//             <div className="progress_box progress_question">{`Question: ${idQuestion +1 } / ${maxQuestions}`}</div>
//         </div>

//         <div className="progressBar_cont">
//             <div className="progressBar_box">
//                 <div className = "progressBarLine" style={{width: `${percentage}%`}}></div>
//                 {/* < ProgressBar now={`${percentage}`} animated variant="danger" className="progressBarLine"/> */}
//             </div>
//         </div>
//         <div className = "dark_Background"></div>
//     </div>
// );