import "./quizOver.css"

const QuizOver = ({score}) => {
    return (
        <div className = "quizOver">
            <p>{`Ton score est de ${score}`}</p>
        </div>
    );
};

export default QuizOver;