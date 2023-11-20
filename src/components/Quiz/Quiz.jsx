import "./quiz.css"
import Navbar from "../NavBar/Navbar";
import Level from "../Level/Level";
import ProgressBar from "../ProgressBar/ProgressBar";
import { questions } from "../../questions"
import React from "react"
import { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import QuizOver from "../QuizOver/QuizOver"

const Quiz = () => { 
    // const location = useLocation()
    // const propsData = location.state //ici je récupère en props le nom de la catégorie ("marvel, dbz" etc...), Ce props a été donnée via Category.jsx dans le Link, grâce à state={} on peut passer des props directement dans le Link navigate même si Quiz n'est pas enfant du parent Category. on a aussi besoin du hook useLocation pour récupérer le state

    const categoryUrl = useParams().category
    const [activeBtn, setActiveBtn] = useState(true)
    const [score, setScore] = useState(0)

    const [level, setLevel] = useState({
        levelNames: ["debutant", "confirme", "expert"],
        userAnswer: null,
        idQuestion: 0,
        quizLevel: 0,
        maxQuestions: 10,
        quizEnd: false,
        actualQuestion: "",
        actualAnswers: []
    })

    const { levelNames, userAnswer, idQuestion, quizLevel, maxQuestions, quizEnd, actualQuestion, actualAnswers } = level
    

    const loadQuestions = (arrayQuestions) => {

        if (arrayQuestions) {
            if (arrayQuestions.length > 0) {
                const fetchedQuestion = arrayQuestions[idQuestion].question
                const fetchedAnswers = arrayQuestions[idQuestion].options
                
                if (fetchedQuestion.length >= maxQuestions) {
                    setLevel({...level, actualQuestion : fetchedQuestion, actualAnswers: fetchedAnswers})   
    
                } else {
                    console.log("Pas assez de questions !")
                }
            }
        }
    }

    useEffect(() => {
        if (questions) {
            const arrayQuestions = questions[0].quiz.category[categoryUrl][levelNames[quizLevel]]
            const arrayQuestionsWithoutRightAnswer = arrayQuestions.map(({answer, ...keepRest})=> { //on passe les questions sans la réponse dans le State
                return keepRest
            })

            // setLevel({...level, storageQuestions: arrayQuestionsWithoutRightAnswer})
            loadQuestions(arrayQuestionsWithoutRightAnswer)
            }

    },[idQuestion, quizLevel, quizEnd, levelNames])

    const chooseAnswer = (answer) => {
        
        setActiveBtn(false)
        setLevel({...level, userAnswer: answer })

    }

    const nextQuestions = () => {

        if (idQuestion === maxQuestions - 1) {
            setLevel({...level, quizEnd: true})

        }
        else {
            setLevel((prevState) => (
                {...level, idQuestion: prevState.idQuestion + 1 })
            )
            setActiveBtn(true)
        }
        
        const rightAnswer = questions[0].quiz.category[categoryUrl][levelNames[quizLevel]][idQuestion].answer
        if (userAnswer === rightAnswer) {
            setScore((prevState) => prevState + 1)
        }
    }

    const loadLevelQuestions = (levelProps) => {
        setLevel({...level, quizLevel : levelProps, quizEnd: false, idQuestion: 0})
        setScore(0)
    }

    return (
        <div>
            <Navbar />
            <Level levelNames={levelNames} quizLevel = {quizLevel}/>
            <ProgressBar maxQuestions={maxQuestions} idQuestion={idQuestion} quizEnd={quizEnd} nameCategory={categoryUrl} />
            
            {
                quizEnd ? <QuizOver score = {score}
                                    maxQuestions = {maxQuestions}
                                    quizLevel = {quizLevel}
                                    loadLevelQuestions = {loadLevelQuestions}
                                    levelNames={levelNames}
                                    nameCategory = {categoryUrl}
                                    />
                : 
                <div className = "questionCont">
                    <div className = "questionFrame">
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
                    </div>
                    <button disabled={activeBtn} onClick={nextQuestions} className ="validBtn">VALIDER</button>
                </div>
            }
        </div>
    );
};

export default React.memo(Quiz);
// export default Quiz