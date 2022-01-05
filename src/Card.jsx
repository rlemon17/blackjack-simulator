import React, { useState } from 'react';

const Card = (props) => {

    const spade = 'https://art.pixilart.com/7af614bf2c08d57.png';
    const clover = 'https://art.pixilart.com/32453e44c4fa793.png';
    const heart = 'https://art.pixilart.com/05d2ffce247e88c.png';
    const diamond = 'https://art.pixilart.com/bfef753fe2e62e4.png';

    // Determine suit
    let suit = spade;

    if (props.suit === 1) {
        suit = clover;
    }
    else if (props.suit === 2) {
        suit = heart;
    }
    else if (props.suit === 3) {
        suit = diamond;
    }

    // Determine rank
    let rankArray = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let rank = rankArray[props.rank];

    return (
        <div className="card-style">
            <p className={(props.suit > 1) ? "card-text-red" : "card-text"}>{rank}</p>
            <div className="suit-container">
                <img className="card-suit" src={suit} alt="suit"></img>
            </div>
        </div>
    )
}

export default Card;