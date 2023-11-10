import "./quiz.css"
import Navbar from "../NavBar/Navbar";
import Level from "../Level/Level";
import BarLevel from "../BarLevel/BarLevel";
import { questions } from "../../questions"
import { useState, useEffect } from "react"

const Quiz = () => {
    const [data, setData] = useState([])
    const [goodQuestion, setGoodQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [idQuestion, setIdQuestion] = useState(0)

    const loadQuestions = () => {
        const fetchedQuestion = questions[0].quiz.category.marvel.debutant[idQuestion].question
        const fetchedAnswers = questions[0].quiz.category.marvel.debutant[idQuestion].options
        setGoodQuestion(fetchedQuestion)   
        setAnswers(fetchedAnswers) 
    }

    const setQuestions = (questions) => {
        if(questions) { 
            Object.keys(questions).map((question) => {
                console.log("2", question)
            })
        }

    }
    useEffect(() => {


            loadQuestions() 
            if (data) {
                setQuestions(data)
                console.log(data)

            }

    },[idQuestion])

    const handleClick = (e) => {
        console.log(e.target.value)
    }

    const nextQuestions = () => {
        setIdQuestion(1)
    }

    return (
        <div>
            <Navbar />
            <Level />
            <BarLevel />
            
            <div className = "questionCont">
                <div className = "questionBox">
                    <p className="question">{goodQuestion}</p>
                    <ul>
                        
            {
                answers.map((answer, index) => {
                   return <li onClick={handleClick} className="answer" key={index}>{index + 1} - {answer}</li>
                })
            }

                    </ul>
                </div>
                <button onclick={nextQuestions} className ="validBtn">VALIDER</button>
            </div>
            
        </div>
    );
};

export default Quiz;