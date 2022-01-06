import React, { useEffect, useState } from 'react';

import Card from './Card.jsx';

const CardRow = () => {

    const [inGame, setInGame] = useState(false);
    const [cardArray, setCardArray] = useState([]);
    const [score, setScore] = useState([]);

    const [dealerArray, setDealerArray] = useState([]);
    const [dealerScore, setDealerScore] = useState([]);
    const [gameMessage, setGameMessage] = useState("Click PLAY to start!");

    const [usedCards, setUsedCards] = useState([]);

    // Function to get final score from an array of points
    const getScore = (scoreArr) => {
        let final = scoreArr[0];
        for (let i = 0; i < scoreArr.length; i++) {
            if (scoreArr[i] > final && scoreArr[i] < 21) {
                final = scoreArr[i];
            }
        }
        return final;
    }

    // Function for the very first deal of the game (2 cards)
    const firstDeal = () => {
        let newCardArray = [];
        let newCard1 = Math.floor(Math.random()*52);
        let newCard2 = Math.floor(Math.random()*52);
        // Prevent repeats
        while (newCard2 === newCard1) {
            newCard2 = Math.floor(Math.random()*52);
        }

        setUsedCards((prev) => [newCard1, newCard2]);

        let points1 = (newCard1 % 13) + 1;
        let points2 = (newCard2 % 13) + 1;

        if (points1 > 10) {
            points1 = 10;
        }
        if (points2 > 10) {
            points2 = 10;
        }

        newCardArray.push(newCard1);
        newCardArray.push(newCard2);

        setCardArray(newCardArray);

        let pointArray = [points1+points2];

        // Edge case for Aces
        if (points1 === 1) {
            pointArray.push(points2 + 11);
        }
        if (points2 === 1) {
            pointArray.push(points1 + 11);
        }
        if (points1 === 1 && points2 === 1) {
            pointArray.push(22);
        }

        setScore(pointArray);

        let newDealerArr = [];
        let newDealerCard = Math.floor(Math.random()*52);
        // Prevent repeats
        while (usedCards.includes(newDealerCard)) {
            newDealerCard = Math.floor(Math.random()*52);
        }

        let dealerPoints = (newDealerCard % 13) + 1;

        if (dealerPoints > 10) {
            dealerPoints = 10;
        }

        newDealerArr.push(newDealerCard);
        setDealerArray(newDealerArr);
        setDealerScore([dealerPoints]);
        setUsedCards((prev) => [...prev, newDealerCard]);
    }

    // Function for subsequent deals (1 card)
    const addCard = () => {
        let newCard = Math.floor(Math.random()*52);
        // Prevent repeats
        while (usedCards.includes(newCard)) {
            newCard = Math.floor(Math.random()*52);
        }

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
        setUsedCards((prev) => [...prev, newCard]);

        // Update Score
        setScore((prev) => {
            let newArray = prev;
            newArray = newArray.map((value) => value + points);

            // Edge case for Aces
            if (points === 1) {
                let aceArray = prev;
                aceArray = aceArray.map((value) => value + 11);

                newArray = newArray.concat(aceArray);
            }

            return newArray;
        });
    }

    // Function for dealer deals (called after choosing to stay)
    const dealerAdd = () => {
        let newDealerArray = dealerArray;
        let newDealerScore = dealerScore;

        // Continuous loop for dealer to get more cards
        while (Math.min(...newDealerScore) < 17 && !newDealerScore.includes(21)) {
            let newCard = Math.floor(Math.random()*52);
            // Prevent repeats
            while (usedCards.includes(newCard)) {
                newCard = Math.floor(Math.random()*52);
            }
            setUsedCards((prev) => [...prev, newCard]);
            
            let newPoint = (newCard % 13) + 1;
            if (newPoint > 10) {
                newPoint = 10;
            }
            newDealerArray.push(newCard);
            newDealerScore = newDealerScore.map((value) => value + newPoint);
            
        }

        setDealerArray(newDealerArray);
        setDealerScore(newDealerScore);
        setInGame(false);

        // Determine winner
        if (newDealerScore.includes(21)) {
            setGameMessage("You Lose!");
        }
        else if (Math.min(...newDealerScore) > 21) {
            setGameMessage("Dealer Bust! You Win!");
        }
        else if (getScore(newDealerScore) > getScore(score)) {
            setGameMessage("You Lose!");
        }
        else if (getScore(newDealerScore) < getScore(score)) {
            setGameMessage("You Win!");
        }
        else {
            setGameMessage("Tie!");
        }
    }

    // Things to check every time cardArray gets updated
    useEffect(() => {
        if (score.includes(21)) {
            setGameMessage("You Win!");
            setInGame(false);
        }
        else if (Math.min(...score) > 21 && score.length > 0) {
            setGameMessage("Bust! You Lose.");
            setInGame(false);
        }
        else if (Math.min(...score) > 0 && score.length > 0) {
            setGameMessage("Hit or Stay?");
            setInGame(true);
        }
        else {
            setGameMessage("Click PLAY to start!");
            console.log(score);
            console.log(Math.min(...score));
            setInGame(false);
        }
    }, [score]);

    return (
        <div>
            {(inGame || score.length > 0) && <p className="dealer-text">Dealer's Hand:</p>}
            {
                dealerArray.map((card) => <Card rank={card % 13} suit={card % 4} dealer={true} />)
            }

            <p className="game-message">{gameMessage}</p>

            <div className='card-row-style'>
                {
                    cardArray.map((card) => <Card rank={card % 13} suit={card % 4} dealer={false}/>)
                }
            </div>
            {
                inGame ? 
                    <div>
                        <div className="btn-style" onClick={addCard}>
                            <p className="btn-text">HIT</p>
                        </div>
                        <div className="btn-style" onClick={dealerAdd}>
                            <p className="btn-text">STAY</p>
                        </div>  
                    </div>
                     :
                    <div className="btn-style" onClick={firstDeal}>
                        <p className="btn-text">PLAY</p>
                    </div>
            }
        </div>
    )
}

export default CardRow;