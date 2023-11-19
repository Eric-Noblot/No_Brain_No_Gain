import "./quizOver.css"

const QuizOver = ({score, maxQuestions, quizLevel, loadLevelQuestions}) => {

    const nextLevel = () => {
        
    }

    const decision = (
    // score >= maxQuestions / 2 + 2 ? ( //le score doit être au moins de 7 pour passer au niveau suivant
        <div className = "quizOver_title">
            <p>{`Bravo ! Tu as réussi ce niveau ! Tu peux passer au suivant :`}</p>
            <button onClick = {() => loadLevelQuestions(quizLevel + 1)}>Niveau Suivant</button>
        </div>
    )
    //  :(
    //     <div className = "quizOver_title">
    //         <p>{`C'est foiré :`}</p>
    //         <button onClick = {nextLevel}>Retenter le quiz</button>
    //     </div>
    // )

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