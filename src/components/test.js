import Navbar from './NavBar/Navbar';

const test = () => {
    return (
        <div>
            <Navbar />
            TEST
        </div>
    );
};

export default test;



//QUIZ COMPONENT 
// import "./quiz.css"
// import Navbar from "../NavBar/Navbar";
// import Level from "../Level/Level";
// import ProgressBar from "../ProgressBar/ProgressBar";
// import { questions } from "../../questions"
// import React from "react"
// import { useState, useEffect } from "react"
// import { useParams, useLocation } from "react-router-dom"
// import QuizOver from "../QuizOver/QuizOver"

// import { db, auth } from "../Firebase/firebase.js"
// import { doc, updateDoc, getDoc } from "firebase/firestore"; 

// const Quiz = () => { 

//     const categoryNameUrl = useParams({}).category
//     const location = useLocation()
//     // const { dataFirestore } = location.state
//     const [activeBtn, setActiveBtn] = useState(true)
//     const [score, setScore] = useState(0)
//     const [arrayRightAnswers, setArrayRightAnswers] = useState([])
//     const [levelFirestore, setLevelFirestore] = useState(0)
//     const [stateFirestore, setStateFirestore] = useState({})
//     const [loading, setLoading] = useState(true)

//     const [level, setLevel] = useState({
//         levelNames: ["debutant", "confirme", "expert"],
//         userAnswer: null,
//         idQuestion: 0,
//         quizLevel: 0,
//         maxQuestions: 10,
//         quizEnd: false,
//         actualQuestion: "",
//         actualAnswers: [],
//         storageQuestions: [],
//     })

//     const { levelNames, userAnswer, idQuestion, quizLevel, maxQuestions, quizEnd, actualQuestion, actualAnswers, storageQuestions } = level

//     const questionsProps = questions[0].quiz.category[categoryNameUrl][levelNames[levelFirestore]]

//     const loadQuestions = (arrayQuestions) => {
//         if (arrayQuestions) {
//             const fetchedQuestion = arrayQuestions[idQuestion].question
//             const fetchedAnswers = arrayQuestions[idQuestion].options
            
//             if (fetchedQuestion.length >= maxQuestions) {
//                 setLevel({...level, actualQuestion : fetchedQuestion, actualAnswers: fetchedAnswers, storageQuestions: arrayQuestions})   

//             } else {
//                 console.log("Pas assez de questions !")
//             }
//         }
//     }

//     const updateFirestore = async () => {

//         const userId = auth.lastNotifiedUid
//         const tropheeRef = doc(db, `users/${userId}/`)  //on update les données sur la clé existante déjà créée par firestore lors du sign up
//         await updateDoc(tropheeRef, 
//             {[categoryNameUrl]: levelFirestore + 1},
//         )
//     }

//     useEffect(() => {   

//         console.log("USE EFFECT !")
//         const getDataFromFirestore = async () => {
//             const userId = auth.lastNotifiedUid
//             const docRef = doc(db, `users/${userId}`);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 const userData = docSnap.data()
//                 setStateFirestore(userData) 
//                 if (levelFirestore === 0 || levelFirestore >= 3) {
//                    setLevelFirestore(0) 
//                 //    setLevelFirestore(userData[categoryNameUrl]) 
//                    console.log("undefine YALALALAd")
//                 }
//                 else {
//                     setLevelFirestore(userData[categoryNameUrl] )
//                     console.log("getData", userData, categoryNameUrl, levelFirestore, stateFirestore)
//                 }
//             } else {
//                 console.log("pas de données !"); 
//             } 
//             setLoading(false)
//         }

//         getDataFromFirestore()

//     },[loading])  
// // },[idQuestion, levelFirestore, levelNames, loading])  

// console.log("stateFirestore", stateFirestore)
    
//     useEffect(() => {
//             console.log("lvlFirestore", levelFirestore)
//             if (questions) {
//                 const arrayDataFirestore = Object.getOwnPropertyNames(stateFirestore)
//                 const alreadyPlayed = arrayDataFirestore.includes(categoryNameUrl)
//                 console.log("arrayDataFirestore", arrayDataFirestore, "stateFirestore", stateFirestore, "alreadyPlayed", alreadyPlayed )
//                 if (alreadyPlayed) { 
//                     console.log("already played", alreadyPlayed)
//                     const arrayQuestions = questions[0].quiz.category[categoryNameUrl][levelNames[levelFirestore]]
//                     const arrayQuestionsWithoutRightAnswer = arrayQuestions.map(({answer, ...keepRest})=> { //on passe les questions sans la réponse dans le State
//                         return keepRest
//                     })
//                     loadQuestions(arrayQuestionsWithoutRightAnswer) 
//                 } else {
//                     console.log("ELSE")
//                     const arrayQuestions = questions[0].quiz.category[categoryNameUrl][levelNames[0]]
//                     const arrayQuestionsWithoutRightAnswer = arrayQuestions.map(({answer, ...keepRest})=> {
//                         return keepRest
//                         })
//                     loadQuestions(arrayQuestionsWithoutRightAnswer)  
//                 } 
//             }

//     },[idQuestion, levelFirestore, quizEnd, levelNames, loading, stateFirestore]) 

//     const chooseAnswer = (answer) => {
        
//         setActiveBtn(false)
//         setLevel({...level, userAnswer: answer })
//     }

//     const nextQuestions = () => {

//         if (idQuestion === maxQuestions - 1) {
//             setLevel({...level, quizEnd: true})
//         }
//         else {
//             setLevel((prevState) => (
//                 {...level, idQuestion: prevState.idQuestion + 1 })
//             )
//             setActiveBtn(true)
//         }
        
//         const rightAnswer = questions[0].quiz.category[categoryNameUrl][levelNames[0]][idQuestion].answer
//         if (userAnswer === rightAnswer) {
//             setScore((prevState) => prevState + 1)
//             setArrayRightAnswers([...arrayRightAnswers, "1"])
//         }else {
//             setArrayRightAnswers([...arrayRightAnswers, "0"])
//         }
//     }

//     const loadLevelQuestions = (levelFromQuizOver, failed) => {
//         console.log("levelFromQuizOver", levelFromQuizOver)
//         setLevel({...level, quizEnd: false, idQuestion: 0})
//         setLevelFirestore(levelFromQuizOver)
//         setScore(0)
//         setArrayRightAnswers([])
//         if (failed !== "failed") {
//             updateFirestore()
//         }
//     }

//     return (
//         <div>
//             <Navbar />
//             <Level levelNames={levelNames} quizLevel = {levelFirestore}/>
//             <ProgressBar maxQuestions={maxQuestions} idQuestion={idQuestion} quizEnd={quizEnd} nameCategory={categoryNameUrl} />
//             {
//                 loading ? (
//                     <div>blablalbcsdvdsvsvsdvsdvsvsdvsdvlablbla</div>

//                 ) : (
//                     quizEnd ? <QuizOver score = {score}
//                                     maxQuestions = {maxQuestions}
//                                     quizLevel = {levelFirestore}
//                                     loadLevelQuestions = {loadLevelQuestions}
//                                     levelNames={levelNames}
//                                     nameCategory = {categoryNameUrl}
//                                     storageQuestions = {questionsProps}
//                                     arrayRightAnswers = {arrayRightAnswers}
//                                     updateFirestore = {updateFirestore}
//                                     />
//                 : 
//                 <div className = "questionCont">
//                     <div className = "questionFrame">
//                         <div className = "questionBox">
//                             <p className="question">{actualQuestion}</p>
        
//                             <ul>
//                                 {
//                                 actualAnswers.map((answer, index) => {
//                                 return  <li onClick={() => chooseAnswer(answer)}
//                                             key={index} 
//                                             className= {`answer ${userAnswer === answer ? "selected" : null}`} >
//                                             {index + 1} - {answer}
//                                         </li>})
//                                 }
//                             </ul>   
        
//                         </div>
//                     </div>
//                     <button disabled={activeBtn} onClick={nextQuestions} className ="validBtn">VALIDER</button>
//                 </div>
//                 )

//             }
//         </div>
//     );
// };

// export default React.memo(Quiz);
// // export default Quiz