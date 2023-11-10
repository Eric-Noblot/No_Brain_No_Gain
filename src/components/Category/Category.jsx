import "./category.css"
import {questions} from "../../questions.js"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

const Category = ({userData}) => {

    const navigate = useNavigate()
    const {pseudo} = userData
    const games = questions[0]

    const [isgameSelected, setisGameSelected] = useState(false)
    const [gameName, setgameName] = useState("")

    const handleGameSelection = (e) => {
        setisGameSelected(true)
        setgameName(e.target.textContent)
    }

    const gamesDisplay = Object.keys(games).map((cat, index) => {
        return  <div className = "box" onClick={handleGameSelection} key={index}>
                    {cat.toUpperCase()}
                </div>
    })

    const handleCategorySelection = () => {
        navigate(`/game/${gameName.toLocaleLowerCase()}`, {state: gameName})
    }

    const handleClickLink = (e) => {
        console.log(e.target.textContent)
        return e.target.textContent
    }

    const gameSelected = (game) => {
        if (game) {
            const categoryPath = questions[0][game.toLowerCase()].category
            const categoryDisplay = Object.keys(categoryPath).map((cat, index) => {
                return  (
                        <Link onClick ={handleClickLink} className = "box" key={index} to={`/game/${gameName.toLocaleLowerCase()}/${handleClickLink}`}>
                            {cat.toUpperCase()}
                        </Link>
                )
            })
            return categoryDisplay
        }
    }


    
    const capitalizePseudo = (name) => {
        if (name) {
            const userNameCapital = name[0].toUpperCase() + name.slice(1).toLowerCase()
            return userNameCapital
        }

    }

    return (
        <main className="category">
            <p className= "game_title">Bienvenue {capitalizePseudo(pseudo)} ! <br /><br />
             Ici on va tester tes connaissances et voir combien de trophées tu peux remporter !</p>
            <p className= "game_title">Commence d'abord par choisir le type de jeu :</p>
            <div className = "category_box">
                {gamesDisplay}
            </div>
            {
            isgameSelected ? (
                <>
                    <p className= "game_title">Choisis ensuite ta catégorie pour les {gameName.toLowerCase()} :</p>
                    <div className = "category_box">
                        {gameSelected(gameName)}
                    </div> 
                </>
            )

                : null
            }
        </main>
    );
};

export default Category;