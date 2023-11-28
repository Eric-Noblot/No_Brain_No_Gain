import "./quiz.css"
import Navbar from "../NavBar/Navbar";
import Level from "../Level/Level";
import ProgressBar from "../ProgressBar/ProgressBar";
import { questions } from "../../questions"
import React from "react"
import { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import QuizOver from "../QuizOver/QuizOver"

import { db, auth } from "../Firebase/firebase.js"
import { doc, updateDoc } from "firebase/firestore"; 


const Quiz = () => { 

    const location = useLocation()
    const { dataFromCategory } = location.state
    const categoryNameUrl = useParams({}).category

    const [activeBtn, setActiveBtn] = useState(true)
    const [score, setScore] = useState(0)
    const [arrayRightAnswers, setArrayRightAnswers] = useState([])
    const [hasAlreadyPlayed, setHasAlreadyPlayed] = useState(false)
    const [levelFromCategory, setLevelFromCategory] = useState(0)

    let levelFromDataFromCategory = dataFromCategory[categoryNameUrl]

    const [level, setLevel] = useState({
        levelNames: ["debutant", "confirme", "expert"],
        userAnswer: null,
        idQuestion: 0,
        quizLevel: 0,
        maxQuestions: 10,
        quizEnd: false,
        actualQuestion: "",
        actualAnswers: [],
        storageQuestions: [],
    })

    const { levelNames, userAnswer, idQuestion, quizLevel, maxQuestions, quizEnd, actualQuestion, actualAnswers, storageQuestions } = level
    const loadQuestions = (arrayQuestions) => {

        if (arrayQuestions.length > 0) {
            const fetchedQuestion = arrayQuestions[idQuestion].question
            const fetchedAnswers = arrayQuestions[idQuestion].options
            if (fetchedQuestion.length >= maxQuestions) {
                setLevel({...level, actualQuestion : fetchedQuestion, actualAnswers: fetchedAnswers, storageQuestions :arrayQuestions})   

            } else {
                console.log("Pas assez de questions !")
            }
        }
    }

    const updateFirestore = async () => {

        const userId = auth.lastNotifiedUid
        const tropheeRef = doc(db, `users/${userId}/`)  //on update les données sur la clé existante déjà créée par firestore lors du sign up
        await updateDoc(tropheeRef, 
            {[categoryNameUrl]: hasAlreadyPlayed ? levelFromCategory + 1 : quizLevel + 1})
    }

    useEffect(() => {

        if (levelFromDataFromCategory) {  //////// !!!!!!!!!!!!!!!! //////// au niveau 1 le quiz prend un +2
            levelFromDataFromCategory < quizLevel ? setLevelFromCategory(quizLevel) : setLevelFromCategory(levelFromDataFromCategory)
            setHasAlreadyPlayed(true)

        } else {
            setHasAlreadyPlayed(false) 
        }
        // console.log("QUIZ LEVEL", quizLevel, "levelFromDataFromCategory", levelFromDataFromCategory)

        if (questions) {
            let arrayQuestions = []
            if (hasAlreadyPlayed) { 
                arrayQuestions = questions[0].quiz.category[categoryNameUrl][levelNames[levelFromCategory]]
            } else {
                arrayQuestions = questions[0].quiz.category[categoryNameUrl][levelNames[quizLevel]]
            }
            // const arrayQuestionsWithoutRightAnswer = arrayQuestions.map(({answer, ...keepRest})=> { //        ici j'ai enlevé l'idée de retirer la réponse dans les questions (pour pas qu'un user puisse chopper les reponses dans le localStorage, mais pour des raisons pratiques je remets la reponse pour l'envoyer en props à quiz Over et les afficher toutes)
            const arrayQuestionsData = arrayQuestions.map((question)=> { 
            return question
                })
            loadQuestions(arrayQuestionsData)  
            
        }  
        // setIsLoading(false)

    },[idQuestion, quizLevel, quizEnd, levelNames, hasAlreadyPlayed, ]) 

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
        
        const rightAnswer = hasAlreadyPlayed ? questions[0].quiz.category[categoryNameUrl][levelNames[levelFromCategory]][idQuestion].answer : questions[0].quiz.category[categoryNameUrl][levelNames[quizLevel]][idQuestion].answer
        if (userAnswer === rightAnswer) {
            setScore((prevState) => prevState + 1)
            setArrayRightAnswers([...arrayRightAnswers, "1"])

        }else {
            setArrayRightAnswers([...arrayRightAnswers, "0"])
        }
    }

    const loadLevelQuestions = (levelFromQuizOver, failed) => {
        
        setLevel({...level, quizLevel : levelFromQuizOver, quizEnd: false, idQuestion: 0})
        setScore(0)
        setLevelFromCategory(levelFromQuizOver)
        setArrayRightAnswers([])
        if (failed !== "failed") {
            updateFirestore()
        }
    }

    return (
        <div>
            <Navbar />
            <Level levelNames={levelNames} quizLevel = {hasAlreadyPlayed ? levelFromCategory : quizLevel}/>
            <ProgressBar maxQuestions={maxQuestions} idQuestion={idQuestion} quizEnd={quizEnd} nameCategory={categoryNameUrl} />
            
            {
                quizEnd ? 
                <QuizOver score = {score}
                    maxQuestions = {maxQuestions}
                    quizLevel = {hasAlreadyPlayed ? levelFromCategory : quizLevel}
                    loadLevelQuestions = {loadLevelQuestions}
                    levelNames={levelNames}
                    nameCategory = {categoryNameUrl}
                    storageQuestions = {storageQuestions}
                    arrayRightAnswers = {arrayRightAnswers}
                    updateFirestore = {updateFirestore}
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