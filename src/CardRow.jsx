import React, { useEffect, useState } from 'react';

import Card from './Card.jsx';

const CardRow = () => {

    const [cardArray, setCardArray] = useState([]);
    const [score, setScore] = useState([0]);
    const [gameMessage, setGameMessage] = useState("Click PLAY to start!");

    const addCard = () => {
        let newCard = Math.floor(Math.random()*52);
        let points = (newCard % 13) + 1;

        // Face Cards
        if (points > 10) {
            points = 10;
        }

        // Update Cards
        setCardArray((prev) => {
            return ([
                ...prev,
                newCard
            ])
        })

        // Update Score
        setScore((prev) => {
            let newArray = prev;

            newArray = newArray.map((value) => value + points);
            
            return newArray;
        });

        if (cardArray.length < 2) {
            let newCard2 = Math.floor(Math.random()*52);
            let points2 = (newCard2 % 13) + 1;

            // Face Cards
            if (points2 > 10) {
                points2 = 10;
            }

            setCardArray((prev) => {
                return ([
                    ...prev,
                    newCard2
                ])
            })

            // Update Score
            setScore((prev) => {
                let newArray2 = prev;
    
                newArray2 = newArray2.map((value) => value + points2);
                
                return newArray2;
            });
        }
    }

    // Things to check every time cardArray gets updated
    useEffect(() => {
        if (score.includes(21)) {
            setGameMessage("You Win!");
        }
        else if (Math.min([...score]) > 21) {
            setGameMessage("Bust! You Lose.");
        }
        else if (Math.min([...score]) > 0) {
            setGameMessage("Hit or Stay?");
        }
        else {
            setGameMessage("Click PLAY to start!");
        }
    }, [score]);

    return (
        <div>
            <p className="game-message">{gameMessage}</p>
            {
                score.map((value) => <p className="game-message">{`${value} `}</p>)
            }
            <div className='card-row-style'>
                {
                    cardArray.map((card) => <Card rank={card % 13} suit={card % 4}/>)
                }
            </div>
            <div className="btn-style" onClick={addCard}>
                <p className="btn-text">{cardArray.length === 0 ? "PLAY" : "HIT"}</p>
            </div>
        </div>
    )
}

export default CardRow;