
import "./memory.css"
import {useState} from "react"
const Memory = () => {

    const [isActive, setIsactive] = useState(false)
    const [actualChoice, setActualChoice] = useState("")

    const montre = (color) => {
        console.log("montre", color)
    }

    const handleClick = (e) => {
        console.log("avant", actualChoice)
        const colorClassName = e.target.className
        if (colorClassName.includes("red")) {
            setActualChoice("red")
            montre("red")
            // e.target.className.classList.add("red")
        } else if (colorClassName.includes("orange")) {
            setActualChoice("orange")
        } else if (colorClassName.includes("green")) {
            setActualChoice("green")
        }
        else {
            setActualChoice("")
        }

        console.log(actualChoice)


        const alreadySelected = colorClassName.includes("memory_active_box")
        // alreadySelected ? e.target.classList.remove("memory_active_box")
        // : e.target.classList.add("memory_active_box")
    }

    const cards = [
        {"src" : "image1"},
        {"src" : "image2"},
        {"src" : "image3"},
        {"src" : "image4"},
        {"src" : "image5"},
        {"src" : "image6"},
        {"src" : "image7"},
        {"src" : "image8"},
    ]

    const newCards = [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()})) 
    // console.log(cards)
    // console.log(newCards)



    return (
        <div className = "memory_container">
            {
            cards.map(() => {
             return <div onClick={handleClick} style = {{backgroundColor: `${actualChoice}`}} className = "memory_box red">1</div>
            })}


        </div>
    )
}

export default Memory