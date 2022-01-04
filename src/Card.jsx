import React, { useState } from 'react';

const Card = () => {

    const [rank, setRank] = useState('A');

    return (
        <div className="card-style">
            <p className="card-text">{rank}</p>
        </div>
    )
}

export default Card;