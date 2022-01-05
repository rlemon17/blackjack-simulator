import React, { useState } from 'react';

import Card from './Card.jsx';

const CardRow = () => {

    const [cardArray, setCardArray] = useState([]);

    const addCard = () => {
        let newCard = Math.floor(Math.random()*52);
        setCardArray((prev) => {
            return ([
                ...prev,
                newCard
            ])
        })

        if (cardArray.length < 2) {
            let newCard2 = Math.floor(Math.random()*52);
            setCardArray((prev) => {
                return ([
                    ...prev,
                    newCard2
                ])
            })
        }
    }

    return (
        <div>
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