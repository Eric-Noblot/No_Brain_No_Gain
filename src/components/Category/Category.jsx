import "./category.css"
import {questions} from "../../questions.js"

const Category = () => {
    
    const categories = questions[0].quiz.category

    const handleClick = (e) => {
        console.log(e.target.textContent)
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