import React from 'react';
import "./memoryCard.css"

const MemoryCard = ( { card, handleChoice }) => {

    return (
        <div onClick = {() => handleChoice(card)} className = "memory_box">
            <img src={card.src} className = "memory_img"></img>
            <img src ="/img/bg6.jpg" className ="memory_img"></img> 
        </div>
    );
};

export default MemoryCard;