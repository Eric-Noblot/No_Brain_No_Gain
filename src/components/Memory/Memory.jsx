
import "./memory.css"
import {useState, useEffect} from "react"
import MemoryCard from "../MemoryCard/MemoryCard"

const Memory = () => {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [firstChoice, setFirstChoice] = useState(null)
    const [secondChoice, setSecondChoice] = useState(null)
    const [flipped, setFlipped] = useState(false)

    const cardImages = [
        {"src" : "/img/anglais.jpg", matched: false},
        {"src" : "/img/animaux.jpg", matched: false},
        {"src" : "/img/arts.jpg", matched: false},
        {"src" : "/img/book.avif", matched: false}
    ]

    const handleChoice = (card) => {
        firstChoice ? setSecondChoice(card) : setFirstChoice(card)
    }

    const handleClickBackground = (e) => {
        // e.target.classList.add("flipped")

    }

    const shuffleCard = () => {
        const shuffledCard = [...cardImages, ...cardImages] //ici j'ajoute 2 fois les images, je trie avec sort et -0.5 pour que le resultat soit positif ou négatif (il oscillera entre 0.5 et 1.5), si le resultat est positif ca trie à l'envers, ca permet de créer un shuffle random, ensuite on .map pour créer un nouveau tableau et ainsi ajouter un id 
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random()})) 
        
        setCards(shuffledCard)
    }

    const resetChoice = () => {
        setFirstChoice(null)
        setSecondChoice(null)
    }

    useEffect(() => {

        if (firstChoice && secondChoice) {
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
                console.log("MAUVAISE PAIR !")
                resetChoice()
            }
            
        }
        console.log(firstChoice, secondChoice)
        console.log("cards", cards)
    },[firstChoice, secondChoice])

    return (

        <div>
            <div className ="memory_title">
                <p>balbablzrlbleblrelberl</p>
                <button onClick ={shuffleCard}>GO</button>
            </div>
            <div className = "memory_container">
                {cards.map((card) => (
                    <MemoryCard
                    card={card}
                    handleChoice={handleChoice}
                    key = {card.id}

                    />
                ))}
            </div>
        </div>

    )
}

export default Memory