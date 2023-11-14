import "./category.css"
import {questions} from "../../questions.js"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

const Category = ({userData}) => {

    const navigate = useNavigate()
    const {pseudo} = userData
    const games = questions[0]

    const [isSelected, setIsSelected] = useState({
        game: false,
        category: false
    })
    const [gameName, setgameName] = useState("")
    const [urlName, setUrlName] = useState("")

    const handleGameSelection = (e) => {

        setIsSelected({...isSelected, game: true, category: false}) //ici je remets category à false pour éviter que l'utilisateur choisisse un game puis une catégorie et avant de valider reclique sur un autre game puis valide, ca crée une page qui ne contient pas la category du game choisi
        setgameName(e.target.textContent)

    }

    const gamesDisplay = Object.keys(games).map((cat, index) => {
        return  <div className = "box" onClick={handleGameSelection} key={index}>
                    {cat.toUpperCase()}
                </div>
    })

    const giveUrlName = (e) => {
        setUrlName(e.target.textContent) 
        setIsSelected({...isSelected, category: true})
    }
    console.log(urlName)
    const gameSelected = (game) => {
        if (game) {
            const categoryPath = questions[0][game.toLowerCase()].category
            const categoryDisplay = Object.keys(categoryPath).map((cat, index) => {
                return  (
                        <div onClick ={giveUrlName} className = "box" key={index}>
                            {cat.toUpperCase()}
                        </div>
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
                isSelected.game ? (
                <>
                    <p className= "game_title">Choisis ensuite ta catégorie pour les {gameName.toLowerCase()} :</p>
                    <div className = "category_box">
                        {gameSelected(gameName)}
                    </div> 
                </>
            )

                : null
            }
            {
                isSelected.category ? (
                    <Link onClick ={giveUrlName} className = "box" to={`/game/${gameName.toLocaleLowerCase()}/${urlName.toLowerCase()}`}>
                    VALIDER
                    </Link>
                )
                : null
            }

        </main>
    );
};

export default Category;