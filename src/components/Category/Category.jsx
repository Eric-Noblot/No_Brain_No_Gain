import "./category.css"
import {questions} from "../../questions.js"
import { useNavigate } from "react-router-dom"
const Category = () => {
    
    const navigate = useNavigate()
    
    const categories = questions[0].quiz.category

    const handleClick = (e) => {
        console.log(e.target.textContent)
        navigate("/quiz")
    }

    const boxCategory = Object.keys(categories).map((cat, index) => {
        return <div className = "box" onClick={handleClick} key={index}>
            {cat.toUpperCase()}
            </div>
    })

    return (
        <div className = "category">
            {boxCategory}

        </div>
    );
};

export default Category;