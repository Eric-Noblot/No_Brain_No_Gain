import "./quizOver.css"
import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom"

const QuizOver = ({score, maxQuestions, quizLevel, loadLevelQuestions, levelNames, nameCategory}) => {

    const navigate = useNavigate()

    const clickBackHome = () => {
        navigate("/home")
    }

    const nameGameCap = nameCategory[0].toUpperCase() + nameCategory.slice(1).toLowerCase()

    const decision = score >= maxQuestions / 2 + 2  ? ( //le score doit être au moins de 7 pour passer au niveau suivant
        quizLevel >= levelNames.length - 1 ? 
            <div className = "quizOver_box">
                <div className = "quizOver_title">
                    <p>{`Bien joué ! Tu remportes la coupe pour la catégorie ${nameGameCap} !`}</p>
                    <GiTrophyCup color = { "gold" } className = "trophee"/>

                </div>
                    <button onClick = {clickBackHome}>Retour au menu</button>
            </div>
            : 
            <div className = "quizOver_title">
                <p>{`Bravo ! Tu as atteint un minimum de 7 bonnes réponses ! `}</p>
                <button onClick = {() => loadLevelQuestions(quizLevel + 1)}>Niveau Suivant</button>
                <button onClick = {clickBackHome}>Retour au menu</button>
            </div>
            )
        : 
        <div className = "quizOver_title">
            <p>{`C'est foiré :`}</p>
            <button onClick = {() => loadLevelQuestions(quizLevel)}>On retente ?</button>
            <button onClick = {clickBackHome}>Retour au menu</button>
        </div>


    return (
        <div className = "quizOver">
            {decision}
            <div className = "quizOver_progress">
                <div className = "quizOver_progress_box">{`Taux de réussite : ${score} / ${maxQuestions}`}</div>
                <div className = "quizOver_progress_box">{`Score : ${score * 10} pts`}</div>
            </div>
            <div className = "quizOver_answers">

            </div>

        </div>
    );
};

export default QuizOver;