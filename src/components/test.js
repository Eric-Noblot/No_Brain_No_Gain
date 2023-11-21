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




// import "./quiz.css"
// import Navbar from "../NavBar/Navbar";
// import Level from "../Level/Level";
// import ProgressBar from "../ProgressBar/ProgressBar";
// import { questions } from "../../questions"
// import React from "react"
// import { useState, useEffect } from "react"
// import { useParams, useLocation } from "react-router-dom"
// import QuizOver from "../QuizOver/QuizOver"
// import Loader from "../Loader/Loader.jsx";

// import { db, auth } from "../Firebase/firebase.js"
// import { doc, updateDoc, getDoc } from "firebase/firestore"; 

// const Quiz = () => { 

//     const categoryNameUrl = useParams({}).category
//     const [activeBtn, setActiveBtn] = useState(true)
//     const [score, setScore] = useState(0)
//     const [arrayRightAnswers, setArrayRightAnswers] = useState([])
//     const [dataFirestore, setDataFirestore] = useState()
//     const [isLoading, setIsLoading] = useState(true)

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
//     const questionsProps = questions[0].quiz.category[categoryNameUrl][levelNames[quizLevel]]

//     const loadQuestions = (arrayQuestions) => {

//         if (arrayQuestions) {
//             if (arrayQuestions.length > 0) {
//                 const fetchedQuestion = arrayQuestions[idQuestion].question
//                 const fetchedAnswers = arrayQuestions[idQuestion].options
                
//                 if (fetchedQuestion.length >= maxQuestions) {
//                     setLevel({...level, actualQuestion : fetchedQuestion, actualAnswers: fetchedAnswers})   
    
//                 } else {
//                     console.log("Pas assez de questions !")
//                 }
//             }
//         }
//     }
//     //Ici j'ai voulu extraire des données de firebase pour comparer les trophees mais jai un bug avec useExpress qui render avant l'initialisation des données. Je sais qu'il suffit de mettre une condition pour régler ça m'y arrive pas
//     const updateFirestore = async () => {
//         console.log("1", dataFirestore[categoryNameUrl], categoryNameUrl)
//         console.log("categoryNameUrl", categoryNameUrl, "quizLevel", quizLevel)
//         const userId = auth.lastNotifiedUid
//         const tropheeRef = doc(db, `users/${userId}/`)  //on update les données sur la clé existante déjà créée par firestore lors du sign up
//         await updateDoc(tropheeRef, 
//             {[categoryNameUrl]: quizLevel + 1}
//         )
//         console.log("userId", userId, "tropheeRef", tropheeRef)
//     }

//     // const getDataFromFirestore = async () => {
//     //     const userId = auth.lastNotifiedUid
//     //     const docRef = doc(db, `users/${userId}`);
//     //     const docSnap = await getDoc(docRef);
//     //     if (docSnap.exists()) {
//     //         const userData = docSnap.data()
//     //         setDataFirestore(userData)
//     //         console.log("getData", userData)
//     //     } else {
//     //         console.log("pas de données !");
//     //     } 
//     // }

//     const displayQuestions = () => {
//         // if (isLoading) {
//         //     console.log("isLoading",isLoading)
//         if (questions) {
//     //         const arrayDataFirestore = Object.getOwnPropertyNames(dataFirestore)
//     //         const alreadyPlayed = arrayDataFirestore.includes(categoryNameUrl)
//     //         console.log(arrayDataFirestore,categoryNameUrl,alreadyPlayed)   
//     //         if (alreadyPlayed) { 
//     //             console.log("IF")
//     //             const levelFirestore = dataFirestore[categoryNameUrl] 
//     //             const arrayQuestions = questions[0].quiz.category[categoryNameUrl][levelNames[levelFirestore]]
//     //             const arrayQuestionsWithoutRightAnswer = arrayQuestions.map(({answer, ...keepRest})=> { //on passe les questions sans la réponse dans le State
//     //                 return keepRest
//     //             })
//     //             loadQuestions(arrayQuestionsWithoutRightAnswer) 
//     //         } else {
//                 const arrayQuestions = questions[0].quiz.category[categoryNameUrl][levelNames[quizLevel]]
//                 const arrayQuestionsWithoutRightAnswer = arrayQuestions.map(({answer, ...keepRest})=> { //on passe les questions sans la réponse dans le State
//                     return keepRest
//                     })
//                 loadQuestions(arrayQuestionsWithoutRightAnswer) 
//             // } 
//         //  }
//         }
//     }

//     useEffect(() => {
//             displayQuestions() 
//             // getDataFromFirestore()       /// ici j'ai voulu faire en sorte de récupérer sur firebase le level de la catégorie pour permettre à l'utilisateur de retomber directement sur la bonne série de questions en fonction de son niveau

//         // setIsLoading(false)
//     },[idQuestion, quizLevel, quizEnd, levelNames])  

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
        
//         const rightAnswer = questions[0].quiz.category[categoryNameUrl][levelNames[quizLevel]][idQuestion].answer
//         if (userAnswer === rightAnswer) {
//             setScore((prevState) => prevState + 1)
//             setArrayRightAnswers([...arrayRightAnswers, "1"])

//         }else {
//             setArrayRightAnswers([...arrayRightAnswers, "0"])
//         }
//     }

//     const loadLevelQuestions = (levelProps, failed) => {
        
//         setLevel({...level, quizLevel : levelProps, quizEnd: false, idQuestion: 0})
//         setScore(0)
//         setArrayRightAnswers([])
//         if (failed !== "failed") {
//             updateFirestore()
//         }
//     }
// console.log("LOAD", isLoading)
//      return (
//         isLoading ?
//         <div>
//             <Navbar />
//             <Level levelNames={levelNames} quizLevel = {quizLevel}/>
//             <ProgressBar maxQuestions={maxQuestions} idQuestion={idQuestion} quizEnd={quizEnd} nameCategory={categoryNameUrl} />
            
//             {
//                 quizEnd ? <QuizOver score = {score}
//                                     maxQuestions = {maxQuestions}
//                                     quizLevel = {quizLevel}
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
//             }
//         </div>
//      : <Loader />);
// };

// export default React.memo(Quiz);
// // export default Quiz