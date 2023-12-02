import "./quizOver.css"
import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const QuizOver = ({score, maxQuestions, quizLevel, loadLevelQuestions, levelNames, nameCategory, storageQuestions, arrayRightAnswers, updateFirestore}) => {

    const navigate = useNavigate()
    const [isFailed, setIsFailed] = useState(true)


    const clickBackHome = (e) => { //je n'incrémente pas le trophee dans firestore si l'utilisateur revient au menu sans avoir validé le test
        const isClassNameFailed = e.target.className
        if (isClassNameFailed === "backToMenu_failed") {
            navigate("/home")
        } else {
            updateFirestore()
            navigate("/home")
        }
    }

    const nameGameCap = nameCategory[0].toUpperCase() + nameCategory.slice(1).toLowerCase()
    // score >= maxQuestions / 2 + 2
    const decision = score >= 0  ? ( //le score doit être au moins de 7 pour passer au niveau suivant
        quizLevel >= levelNames.length - 1 ? 
            <div className = "quizOver_box">
                <div className = "quizOver_title_final">
                    <h2>Félicitations !!!</h2>
                    <p>{`Tu remportes le dernier niveau du quiz ${nameGameCap} ! Tu deviens Maître dans cette catégorie !`}</p>
                    {/* <GiTrophyCup color = { "gold" } className = "trophee"/> */}
                </div>
                <button onClick = {clickBackHome}>Retour au menu</button>
            </div>
            : 
            <div className = "quizOver_title_win">
                <p>{`Bravo ! Tu as atteint un minimum de 7 bonnes réponses ! `}</p>
                <p>{`Tu peux passer au niveau suivant ! `}</p>
                <div className="quizOver_boxButtons_win">
                    <button onClick = {() => loadLevelQuestions(quizLevel + 1)}>Niveau Suivant</button>
                    <button onClick = {clickBackHome}>Retour au menu</button>
                </div>
            </div>
            )
        : 
        <div className = "quizOver_title">
            <p>{`C'est foiré :`}</p>
            <button onClick = {() => loadLevelQuestions(quizLevel, "failed")}>On retente ?</button>
            <button className = "backToMenu_failed" onClick = {clickBackHome}>Retour au menu</button>
        </div>


    const tableQuestions =  score >= 0  ? (
        storageQuestions.map((question) => {
            return (
                <tr key={question.id}>
                    <td>{question.id + 1}. {question.question}</td>
                    <td style={{backgroundColor: arrayRightAnswers[question.id] === "1" ? "rgba(44, 231, 47, 0.403)" : "rgba(241, 43, 43, 0.403)"}}>{question.answer}</td>
                </tr>
            )
        })
    )   : (
            <tr>
                <td colSpan="3" style={{textAlign: "center"}}> {/* comme on a 3 colones normalement, on veut ce notre td remplisse tout le tableau */}
                    Le quizz doit être validé pour avoir accès aux réponses !
                </td>
            </tr>
        )

    
    return (
        <div className = "quizOver">
            {decision}
            <div className = "quizOver_progress">
                <div className = "quizOver_progress_box">{`Réponses : ${score} / ${maxQuestions}`}</div>
                <div className = "quizOver_progress_box">{`Score : ${score * 10} pts`}</div>
            </div>
            <div className = "quizOver_answers">
                <table className = "table_answers">
                    <thead>
                        <tr>
                            <th>QUESTIONS</th>
                            <th>RÉPONSE</th>
                        </tr>
                    </thead>
                    <tbody>
                            {tableQuestions}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizOver;