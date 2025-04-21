
import "./memory.css"
import {useState, useEffect} from "react"
import MemoryCard from "../MemoryCard/MemoryCard"
import { questions } from "../../questions"

const Memory = () => {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [firstChoice, setFirstChoice] = useState(null)
    const [secondChoice, setSecondChoice] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [level, setLevel] = useState(0)
    const [winGame, setWinGame] = useState(false)

    const cardsFromDatabase = questions[0].jeux.category.memory[level]


    const handleChoice = (card) => {
        firstChoice ? setSecondChoice(card) : setFirstChoice(card)
    }

    const shuffleCard = () => {
        const shuffledCard = [...cardsFromDatabase, ...cardsFromDatabase] //ici j'ajoute 2 fois les images, je trie avec sort et -0.5 pour que le resultat soit positif ou négatif (il oscillera entre 0.5 et 1.5), si le resultat est positif ca trie à l'envers, ca permet de créer un shuffle random, ensuite on .map pour créer un nouveau tableau et ainsi ajouter un id 
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random()})) 
        
        setFirstChoice(null)
        setSecondChoice(null)
        setWinGame(false)
        setCards(shuffledCard)
        setTurns(0) 
    }

    const resetChoice = () => {
        setFirstChoice(null)
        setSecondChoice(null)
        setWinGame(false)
        setTurns((prevState) => {
            return prevState + 1
        })
        setDisabled(false)
    }

    const nextLevel = () => {
        setLevel((prevState) => prevState +1)
        shuffleCard()
    }

    const displayGame = turns < 15 ? (
        
        <>
        <div className ="memory_title">
            <p>Termine en moins de 15 tours chaque puzzle !</p>
            <p>{`Niveau ${level +1}`}</p>
            {/* <button onClick ={shuffleCard}>Recommencer</button>
            <button onClick ={nextLevel}>Next</button> */}
        </div>
        <div className = "memory_container">
            {cards.map((card) => (
                <MemoryCard
                card={card}
                handleChoice={handleChoice}
                key = {card.id}
                flipped = {card === firstChoice || card === secondChoice || card.matched} //ici on crée directement un boolen en props en lui disant que si une de ces 3 conditions est vrai on passe true à l'enfant
                disabled ={disabled}
                />
            ))}
        </div>
        <p style={{marginTop : "15px"}}>{`Nombre de tours : ${turns}`}</p>
        </>
    ) :
    (
        <div className ="memory_title">
            <p>Aie ! Tu viens de dépasser le nombre de tours pour finir ce jeu !</p>
            <button onClick ={shuffleCard}>Recommencer</button>
            <button onClick ={nextLevel}>Next</button>
        </div>
    )
    
    const winBox = winGame ? (
        <div className = "memory_winBox">
            <div>FÉLICITATIONS</div>
            <button onClick ={shuffleCard}>Recommencer</button>
            <button onClick ={nextLevel}>Next</button>
        </div>
    ) : null

    useEffect(() => {
        if (firstChoice && secondChoice) {
            setDisabled(true) // Pour éviter que l'utilisateur clique plein de fois sur les cartes sans attendre que les 2 cartes soient remises à l'envers, on cree un state disabled quon va activer le temps que le settimeout se fasse, on le redesactivera à la fin du resetChoice

            if (firstChoice.src === secondChoice.src) { //Si la pair a été trouvée, on set le tableau Cards en récupérant dabord le state précédent, puis on map dessus pour trouver la réponse qui correspond à celle du tableau. On compare que firstChoice peu importe puisque que dans ce If ils secondChoice est sensé être égal à first. Une fois les réponses trouvées on met true à matched dans l'objet du State
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === firstChoice.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetChoice()
            }
            else {
                setTimeout(() => {
                    resetChoice()
                }, "1500")
            }
        }

        //on vérifie que tous les matched sont à true pour afficher le résultat
        if (cards.length > 0 ) {
            const check = cards.map((card) => card.matched)
            if (check.includes(false)) {
                setWinGame(false)
            }
            else {
                setWinGame(true)
            }
    
        }

    },[firstChoice, secondChoice])

    useEffect(() => {
        shuffleCard()
    },[level])

    const postGpt = () => {
        alert ("Contacter GPT")
    }
    return (

        <div className="memory"> 

            {displayGame}
            {winBox}
            <div className ="chatgpt" >
                CHAT GPT
                <input className ="gptQuestion" type="text" placeholder="Question..."></input>
                <input className ="gptAnswer" type="text"  placeholder="Réponse..." ></input>
                <button onClick = {postGpt} className = "gptButton">CLICK</button>
            </div>
        </div>

    )
}

export default Memory