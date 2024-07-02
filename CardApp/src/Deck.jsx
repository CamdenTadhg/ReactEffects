import React, { useEffect, useState } from 'react';
import Card from './Card'
import axios from 'axios';

const Deck = () => {
    const [deckId, setDeckId] = useState(null);
    const [count, setCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [drawDisabled, setDrawDisabled] = useState(false);

    useEffect(() => {
        async function getDeck(){
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            setDeckId(response.data.deck_id);
            console.log(response.data.deck_id);
        }
        getDeck();
    }, []);

    const incrementCount = () => {
        setCount(c => c + 1);
    }

    useEffect(() => {
        async function drawCard(){
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
            console.log(response);
            if (!response.data.success){
                alert('Error: no more cards');
            }
            const newCard = {image: response.data.cards[0].image, card: `${response.data.cards[0].value} of ${response.data.cards[0].suit}`};
            const newArray = [...cards, newCard];
            setCards(newArray);
        }
        console.log('count = ', count);
        if (deckId && count > 0){
            drawCard();
        }
    }, [count])

    return (
        <div>
            <button  onClick={incrementCount}>Draw a card</button>
            <div>
                {cards.map((card, i) => (
                    <Card key={i} image={card.image} altText={card.card}/>
                ))}
            </div>
        </div>
    );
}


export default Deck;