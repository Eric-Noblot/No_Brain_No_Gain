import "./quizOver.css"
import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom"

import { db, auth } from "../Firebase/firebase.js"
import { doc, updateDoc, setDoc, addDoc, collection } from "firebase/firestore"; 


const QuizOver = ({score, maxQuestions, quizLevel, loadLevelQuestions, levelNames, nameCategory, storageQuestions, arrayRightAnswers}) => {

    const navigate = useNavigate()
    
    const clickBackHome = () => {
        navigate("/home")
    }

    const nameGameCap = nameCategory[0].toUpperCase() + nameCategory.slice(1).toLowerCase()
    // score >= maxQuestions / 2 + 2
    const decision = score >= 0  ? ( //le score doit être au moins de 7 pour passer au niveau suivant
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

    const tableQuestions = storageQuestions.map((question) => {
        return (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td style={{color: arrayRightAnswers[question.id] === "1" ? "green" : "red"}}>{question.answer}</td>
            </tr>
        )
    })
    
    //////////////////////////////////
        // :////////////////////////////////////////

        const handleFirestore = async () => {

            const userId = auth.lastNotifiedUid
            
            // const userId = auth.lastNotifiedUid
            // await setDoc(doc(db, `users/${userId}`), { //pour créer des données
            //     [nameCategory]: quizLevel + 1
            // });

            const tropheeRef = doc(db, `users/${userId}/`)  //on updtate les données sur la clé existante déjà créée par firestore lors du sign up
            await updateDoc(tropheeRef, 
                {[nameCategory]: quizLevel + 1}
            )


        }
    return (
        <div className = "quizOver">
            {decision}
            <div className = "quizOver_progress">
                <div className = "quizOver_progress_box">{`Taux de réussite : ${score} / ${maxQuestions}`}</div>
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
        <button onClick={handleFirestore}>FIRESTORE</button>

        </div>
    );
};

export default QuizOver;