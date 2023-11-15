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
    const [data, setData] = useState({})
    const [score, setScore] = useState(0)

    const [level, setLevel] = useState({
        levelNames: ["debutant", "confirme", "expert"],
        userAnswer: null,
        idQuestion: 0,
        quizLevel: 0,
        maxQuestions: 10,
        quizEnd: false,
        storageQuestions: [],
        actualQuestion: "",
        actualAnswers: []
    })

    const { levelNames, userAnswer, idQuestion, quizLevel, maxQuestions, quizEnd, storageQuestions, actualQuestion, actualAnswers } = level
    

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
            const arrayQuestionsWithoutRightAnswer = arrayQuestions.map(({answer, ...keepRest})=> { //on passe les questions sans la réponse dans le State
                return keepRest
            })

            setLevel({...level, storageQuestions: arrayQuestionsWithoutRightAnswer})
            if (storageQuestions) {
                loadQuestions(storageQuestions) 
            }
            }

    },[storageQuestions, idQuestion, quizLevel, quizEnd])

    const chooseAnswer = (answer) => {
        
        setActiveBtn(false)
        setLevel({...level, userAnswer: answer })

    }

    const nextQuestions = () => {

        if (idQuestion === maxQuestions - 1) {
            setLevel({...level, quizEnd: true})
            console.log("IF passe dans le nextQuestions")

        }
        else {
            setLevel((prevState) => (
                {...level, idQuestion: prevState.idQuestion + 1 })
            )
            setActiveBtn(true)
            console.log("ELSE passe dans le nextQuestions")
        }
        
        const rightAnswer = questions[0].quiz.category[categoryUrl][levelNames[quizLevel]][idQuestion].answer
        if (userAnswer === rightAnswer) {
            setScore((prevState) => prevState + 1)
        }
    }

    return (
        <div>
            <Navbar />
            <Level />
            <BarLevel />
            
            {
                quizEnd ? <QuizOver score = {score}/>
                : 
                <div className = "questionCont">
                    <div className = "questionBox">
                        <p className="question">{actualQuestion}</p>
    
                        <ul>
                            {
                            actualAnswers.map((answer, index) => {
                            return  <li onClick={() => chooseAnswer(answer)}
                                        key={index} 
                                        className= {`answer ${userAnswer === answer ? "selected" : null}`} >
                                            {index + 1} - {answer}
                                    </li>})
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