import "./quiz.css"
import Navbar from "../NavBar/Navbar";
import Level from "../Level/Level";
import BarLevel from "../BarLevel/BarLevel";
import { questions } from "../../questions"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import QuizOver from "../QuizOver/QuizOver"

const Quiz = () => {

    const categoryUrl = useParams().category
    const [activeBtn, setActiveBtn] = useState(true)

    const [level, setLevel] = useState({
        levelNames: ["debutant", "confirme", "expert"],
        userAnswer: null,
        idQuestion: 0,
        quizLevel: 0,
        maxQuestions: 10,
        quizEnd: false,
        score: 0,
        storageQuestions: [],
        actualQuestion: "",
        actualAnswers: []
    })

    const { levelNames, userAnswer, idQuestion, quizLevel, maxQuestions, quizEnd, score, storageQuestions, actualQuestion, actualAnswers } = level

    const loadQuestions = (storageQuestions) => {

        if (storageQuestions.length > 0) {
            const fetchedQuestion = storageQuestions[idQuestion].question
            const fetchedAnswers = storageQuestions[idQuestion].options

            if (fetchedQuestion.length >= maxQuestions) {
                setLevel({...level, actualQuestion : fetchedQuestion, actualAnswers: fetchedAnswers})   
            } else {
                console.log("Pas assez de questions !")
            }
        }
    }

    useEffect(() => {

        if (questions) {
            const arrayQuestions = questions[0].quiz.category[categoryUrl][levelNames[quizLevel]]
            setLevel({...level, storageQuestions: arrayQuestions})
            if (storageQuestions) {
                loadQuestions(storageQuestions) 
            }
            }

    },[storageQuestions, idQuestion, quizLevel, quizEnd])

    const submitAnswer = (option) => {
        
        setActiveBtn(false)
        setLevel({...level, userAnswer: option })
    }

    const nextQuestions = () => {

        if (idQuestion === maxQuestions - 1) {
            setLevel({...level, quizEnd: true})
        }
        else {
            setLevel((prevState) => (
                {...level, idQuestion: prevState.idQuestion + 1 }
                )
            )
        }
    }

    return (
        <div>
            <Navbar />
            <Level />
            <BarLevel />
            
            {
                quizEnd ? <QuizOver />
                : 
                <div className = "questionCont">
                    <div className = "questionBox">
                        <p className="question">{actualQuestion}</p>
    
                        <ul>
                            {
                            actualAnswers.map((answer, index) => {
                            return <li onClick={() => submitAnswer(answer)} className= {`answer ${userAnswer === answer ? "selected" : null}`} key={index}>{index + 1} - {answer}</li>
                            })
                            }
                        </ul>   
    
                    </div>
                    <button disabled={activeBtn} onClick={nextQuestions} className ="validBtn">VALIDER</button>
                </div>
            }
        </div>
    );
};

export default Quiz;