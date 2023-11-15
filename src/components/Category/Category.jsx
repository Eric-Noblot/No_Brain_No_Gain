import "./category.css"
import {questions} from "../../questions.js"
import { useNavigate, Link } from "react-router-dom"
import { useState, useRef } from "react"

const Category = ({userData}) => {
    const navigate = useNavigate()
    const {pseudo} = userData
    const games = questions[0]

    const [isSelected, setIsSelected] = useState({
        game: false,
        category: false
    })
    const [gameName, setgameName] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [urlName, setUrlName] = useState("")

    const handleGameSelection = (e) => {

        setIsSelected({...isSelected, game: true, category: false}) //ici je remets category à false pour éviter que l'utilisateur choisisse un game puis une catégorie et avant de valider reclique sur un autre game puis valide, ca crée une page qui ne contient pas la category du game choisi
        console.log("1", gameName)
        setgameName(e.target.textContent)
        console.log("2", gameName)
    }

    const gamesDisplay = Object.keys(games).map((category, index) => {
        return  <div className = {`box ${category ===  gameName.toLowerCase() ? "boxActive" : null }`} onClick={handleGameSelection} key={index}>
                    {category.toUpperCase()}
                </div>
    })

    const giveUrlName = (e) => {
        console.log("3", urlName)

        setUrlName(e.target.textContent) 
        console.log("4", urlName)
        setIsSelected({...isSelected, category: true})
    }

    const categorySelected = () => {
        console.log(urlName)
    }

    const gameSelected = (game) => {
        if (game) {
            const categoryObject = questions[0][game.toLowerCase()].category
            const categoryDisplay = Object.keys(categoryObject).map((category, index) => {
                return  (
                        <div onClick ={giveUrlName} className = {`box ${category === urlName.toLowerCase() ? "boxActive" : null}`} key={index}>
                            <span className="">{category.toUpperCase()}</span>
                        </div>
                )
            })
            return categoryDisplay
        }
    }

    // 
    
    const capitalizePseudo = (name) => {
        if (name) {
            const userNameCapital = name[0].toUpperCase() + name.slice(1).toLowerCase()
            return userNameCapital
        }

    }

    return (
        <main className="category">
            <p className= "game_title">Bienvenue {capitalizePseudo(pseudo)} ! <br /><br /></p>
            <p className= "game_title">Commence par choisir le type de jeu :</p>
            <div className = "category_box">
                {gamesDisplay}
            </div>
            {
                isSelected.game ? (
                <>
                    <p className= "game_title">Choisis maintenant la catégorie pour les {gameName.toLowerCase()} :</p>
                    <div className = "category_box">
                        {gameSelected(gameName)}
                    </div> 
                </>
            )

                : null
            }
            {
                isSelected.category ? (
                        <Link onClick ={giveUrlName} className = "box linkCategory" to={`/game/${gameName.toLocaleLowerCase()}/${urlName.toLowerCase()}`}>
                        VALIDER
                        </Link>
                )
                : null
            }

        </main>
    );
};

export default Category;