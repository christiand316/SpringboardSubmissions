import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from './Card'

const apiURL = 'https://deckofcardsapi.com/api/deck'
function Deck() {
    const [deck, setDeck] = useState(null)
    const [drawnCard, setDrawnCards] = useState([])
    const [hideDrawBtn, setHideDrawBtn] = useState(false)
    const [hideShuffleBtn, setShuffleDrawBtn] = useState(false)

    useEffect(function fetchDeckData() {
        async function fetchDeck() {
          const deckData = await axios.get(`${apiURL}/new/shuffle/`);
            setDeck(deckData.data);
        }
        fetchDeck();
      }, []);

    async function drawCard() {
        if (drawnCard.length === 52) {
            setHideDrawBtn(true)
            return
        }
        
            const drawCardRes = await axios.get(`${apiURL}/${deck.deck_id}/draw`)

            setDrawnCards((oldDrawnDeck) => [...oldDrawnDeck, {image: drawCardRes.data.cards[0].image, key: drawCardRes.data.cards[0].code}])
    }
    
    async function shuffleDeck() {
        setShuffleDrawBtn(true)
        await axios.get(`${apiURL}/${deck.deck_id}/shuffle/`)
        setDrawnCards([])
        setHideDrawBtn(false)
        setShuffleDrawBtn(false)
    }
      
    
      return (
        <div>
            <button 
              onClick={drawCard}
              disabled={hideDrawBtn}>
              GIMME A CARD </button>
            
            <button 
            onClick={shuffleDeck}
            disabled={hideShuffleBtn}>
            SHUFFLE DECK</button>

            <div>
                { drawnCard.map(card => {
                    return <Card image={card.image} key={card.key}/>
                    })
                }
            </div>
            
        </div>
    )
}

export default Deck