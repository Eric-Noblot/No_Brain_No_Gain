import React from 'react';
import "./memoryCard.css"

const MemoryCard = ( { card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div>
            <div className = {flipped ? " memory_box flipped" : "memory_box"}  >
                <img src={card.src} alt="front_img" className = "memory_front_img"></img>
                <img onClick = {handleClick} src ="/img/bg6.jpg" alt ="back_img" className ="memory_back_img"></img> 
            </div>
        </div>
    );
};

export default MemoryCard;