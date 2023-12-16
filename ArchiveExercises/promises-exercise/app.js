import axios from axios

const BASE_URL = "http://numbersapi.com"
let favoriteNumber = 2
async function part1() {
    let res = await axios.get(`${BASE_URL}/${favoriteNumber}?json`)

    let favoriteNumbers = "2,3,4"
    let res2 = await axios.get(`${BASE_URL}/${favoriteNumbers}?json`)

    let res3 = await axios.get(`${BASE_URL}/${favoriteNumber}?json`)
    const parent = document.getElementsByClassName("parentName")
    res3.map((item, index) => (
        parent.append(`<div> ${item.index} </div>`)
    ))
}
const BASE_URL_PART2 = "https://deckofcardsapi.com/api/deck"
let res = await axios.get(`${BASE_URL_PART2}/new/shuffle/`).then((res) => res.data)

const button = document.getElementsByClassName("button")
const cardDeck = document.getElementsByClassName("card-deck")

button.addEventListener('click', clickedDeck())
let newCardNewDeck = await axios.get(`${BASE_URL_PART2}/new/shuffle/`).then((res) => res.data)
console.log(newCardNewDeck)
async function clickedDeck() {
    let newCardSameDeck = await axios.get(`${BASE_URL_PART2}/${newCardNewDeck.deck_id}/draw/`).then((res) => res.data)
    console.log(newCardSameDeck)

    if(newCardSameDeck.remaining === 0) {
        button.remove()
        return
    }

    const newCardImage = document.createElement('img')
    newCardImage.src = `"${newCardSameDeck.cards[0].image}"`
    cardDeck.appendChild(newCardImage)
}