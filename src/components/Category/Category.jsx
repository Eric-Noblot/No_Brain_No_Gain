import "./category.css"
import {questions} from "../../questions.js"
import { Link } from "react-router-dom"
import { useState } from "react"
import quizPicture from "../../img/category/quiz.avif"
import jeuxPicture from "../../img/category/jeux.png" 
import testPicture from "../../img/category/test.png"
import dbzPicture from "../../img/category/dbz.jpg"
import marvelPicture from "../../img/category/marvel.webp"
import cyberpunkPicture from "../../img/category/cyberpunk.webp"

const Category = ({userData}) => {
    const {pseudo} = userData
    const games = questions[0]

    const [isSelected, setIsSelected] = useState({
        game: false,
        category: false
    })
    const [gameName, setgameName] = useState("")
    const [urlName, setUrlName] = useState("")
    const [activeBox, setActiveBox ] = useState(false)

    const getPicture = (category) => {

        switch (category) {
            case "quiz" : 
            return quizPicture
            case "jeux" : 
            return jeuxPicture
            case "test" : 
            return testPicture
            case "dbz" : 
            return dbzPicture
            case "marvel" : 
            return marvelPicture
            case "cyberpunk" : 
            return cyberpunkPicture
        }
    }

    const handleGameSelection = (e) => {
        setIsSelected({...isSelected, game: true, category: false}) //ici je remets category à false pour éviter que l'utilisateur choisisse un game puis une catégorie et avant de valider reclique sur un autre game puis valide, ca crée une page qui ne contient pas la category du game choisi
        setgameName(e.target.textContent)
        setUrlName("")
    }

    const gameSelection = Object.keys(games).map((category, index) => {
    return  <div className = {`box_card ${category === gameName.toLowerCase() ? "boxActive" : null}`} onClick={handleGameSelection} key={index}>   
                <img className = "category_picture" src={getPicture(category)} alt ="category_picture" />
                {category.toUpperCase()}
            </div>
    })

    const categorySelection = (game) => {
        if (game) {
            const categoryObject = questions[0][game.toLowerCase()].category
            const categoryDisplay = Object.keys(categoryObject).map((category, index) => {
                return  (
                        <div onClick ={giveUrlName} className = {`box_card ${category === urlName.toLowerCase() ? "boxActive" : null}`} key={index}>
                            <img className = "category_picture" src={getPicture(category)} alt ="category_picture" />
                            {category.toUpperCase()}
                        </div>
                )
            })
            return categoryDisplay
        }
    }

    const giveUrlName = (e) => {

        setUrlName(e.target.textContent) 
        setIsSelected({...isSelected, category: true})
    }

    const capitalizePseudo = (name) => {
        if (name) {
            const userNameCapital = name[0].toUpperCase() + name.slice(1).toLowerCase()
            return userNameCapital
        }

    }

    return (
        <main className="category">
            <p className= "welcome_title">Bienvenue {capitalizePseudo(pseudo)} ! <br /><br /></p>
            <p className= "game_title">Commence par choisir le type de jeu :</p>
            <div className = "category_box">
                {gameSelection}
            </div>
            {
                isSelected.game ? (
                <>
                    <p className= "game_title">Choisis maintenant la catégorie pour les {gameName.toLowerCase()} :</p>
                    <div className = "category_box">
                        {categorySelection(gameName)}
                    </div> 
                </>
            )
                : null
            }
            {
                isSelected.category ? (
                        <Link onClick ={giveUrlName} className = " category_link" to={`/game/${gameName.toLocaleLowerCase()}/${urlName.toLowerCase()}`}>
                        VALIDER
                        </Link>
                )
                : null
            }

        </main>
    );
};

export default Category;