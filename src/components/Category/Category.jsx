import "./category.css"
import {questions} from "../../questions.js"
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import quizPicture from "../../img/category/quiz.avif"
import jeuxPicture from "../../img/category/jeux.png" 
import testPicture from "../../img/category/test.png"
import dbzPicture from "../../img/category/dbz.jpg"
import marvelPicture from "../../img/category/marvel.webp"
import cyberpunkPicture from "../../img/category/cyberpunk.webp"
import { GiTrophyCup } from "react-icons/gi";
import { getDoc, doc } from "firebase/firestore"
import { db, auth } from "../Firebase/firebase.js"

const Category = ({userData}) => {
    const {pseudo} = userData
    const games = questions[0]

    const [isSelected, setIsSelected] = useState({
        game: false,
        category: false
    })

    const [gameName, setgameName] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [dataFromFirestore, setDataFromFirestore] = useState("")

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
            default :
            return "Error"
        }
    }

    const handleGameSelection = (e) => {
        setIsSelected({...isSelected, game: true, category: false}) //ici je remets category à false pour éviter que l'utilisateur choisisse une game puis une catégorie et avant de valider reclique sur un autre game puis valide, ca crée une page qui ne contient pas la category du game choisi
        setgameName(e.target.textContent)
        setCategoryName("")
    }
    const gameSelection = Object.keys(games).map((category, index) => {
    return  <div className = {`box_card ${category === gameName.toLowerCase() ? "boxActive" : null}`} onClick={handleGameSelection} key={index}>   
                <img className = "category_picture" src={getPicture(category)} alt ="category_picture" />
                {category.toUpperCase()}
            </div>
    })

    const categorySelection = (game) => {
        if (game) {
            const arrayDataFirestore = Object.getOwnPropertyNames(dataFromFirestore) //ici je récupère le lvl sur firestore et je récupère toutes les données (dont les catégories qui m'interessent) dans un tableau afin de pouvoir faire la methode includes et checker si la catégorie (et donc un lvl deja passé) existe dans la db pour gérer si on affiche ou non la cup

            const categoryObject = questions[0][game.toLowerCase()].category
            const categoryDisplay = Object.keys(categoryObject).map((category, index) => {
                return  (
                        <div onClick ={getCategoryName} className = {`box_card ${category === categoryName.toLowerCase() ? "boxActive" : null}`} key={index}>
                            <img className = "category_picture" src={getPicture(category)} alt ="category_picture" />
                            <div className = "category_title">
                                {category.toUpperCase()}
                                {
                                    arrayDataFirestore.includes(category) ? //on affiche la coupe seulement si un lvl existe déja dans la db
                                        <GiTrophyCup className ="category_trophee" color = {getCupColor(dataFromFirestore[category])}  size = { 30 }/>
                                    : null
                                } 
                            </div>
                        </div>
                )
            })
            return categoryDisplay
        }
    }

    const getCategoryName = (e) => {

        setCategoryName(e.target.textContent) 
        setIsSelected({...isSelected, category: true})
    }

    const capitalizePseudo = (name) => {
        if (name) {
            const userNameCapital = name[0].toUpperCase() + name.slice(1).toLowerCase()
            return userNameCapital
        }

    }

    const getDataFromFirestore = async () => {
        const userId = auth.lastNotifiedUid

        const docRef = doc(db, `users/${userId}`);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const userData = docSnap.data()
            setDataFromFirestore(userData)
        } else {
            console.log("pas de données !");
        }
    }

    const getCupColor = (levelTrophee) => {

        switch(levelTrophee) {
            case 1:return "rgb(201, 114, 60)"
            case 2: return "silver"
            case 3: return "gold"
            default : return "transparent"
        }
    }

    useEffect(() => {
        getDataFromFirestore()

    },[])
console.log(dataFromFirestore)
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
                    <div className ="category_rules">
                        <p>Le quiz comporte 3 niveaux de difficulté. Chaque niveau comporte 10 questions. <br />
                        Si tu obtiens au moins 7 bonnes réponses, tu peux passer au niveau supérieur! <br/>
                        Pour chaque palier atteint, tu obtiendras une coupe représentant ton classement dans cette catégorie.<br/>
                        Passe les 3 niveaux de difficulté à la suite pour remporter la Coupe en OR !
                        </p>
                    </div>
                    <p className= "game_title">Choisis une catégorie !</p>
                    <div className = "category_box">
                        {categorySelection(gameName)}
                    </div> 
                </>
            )
                : null
            }
            {
                isSelected.category ? (
                        <Link state = {{dataFirestore: dataFromFirestore}} onClick ={getCategoryName} className = "category_link" to={`/game/${gameName.toLocaleLowerCase()}/${categoryName.toLowerCase()}`}>
                        VALIDER
                        </Link>
                )
                : null
            }
        </main>
    );
};

export default Category;