import React, { useEffect, useState } from 'react';
import Card from './Card'
import axios from 'axios';

const Deck = () => {
    const [deckId, setDeckId] = useState(null);
    const [count, setCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [shuffle, setShuffle] = useState(false);

    useEffect(() => {
        async function getDeck(){
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            setDeckId(response.data.deck_id);
        }
        getDeck();
    }, []);

    const incrementCount = () => {
        setCount(c => c + 1);
    }

    const toggleShuffle = () => {
        setShuffle(true);
    }

    useEffect(() => {
        async function drawCard(){
            console.log(deckId);
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
            if (!response.data.success){
                alert('Error: no more cards');
            }
            const newCard = {image: response.data.cards[0].image, card: `${response.data.cards[0].value} of ${response.data.cards[0].suit}`};
            const newArray = [...cards, newCard];
            setCards(newArray);
        }
        if (deckId && count > 0){
            drawCard();
        }
    }, [count]);

    useEffect(() => {
        async function shuffleDeck(){
            console.log(deckId);
            setCards([]);
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle`);
        }
        if (shuffle === true){
            shuffleDeck();
            setShuffle(false);
        }
    }, [shuffle]);

    return (
        <div>
            <button  onClick={incrementCount}>Draw a card</button>
            <button onClick={toggleShuffle} disabled={shuffle}>Shuffle the deck</button>
            <div>
                {cards.map((card, i) => (
                    <Card key={i} image={card.image} altText={card.card}/>
                ))}
            </div>
        </div>
    );
}


export default Deck;