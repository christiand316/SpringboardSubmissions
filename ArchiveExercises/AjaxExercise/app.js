const gifTrack = document.querySelector('.gifTrack')
const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#searchButton')
const removeButton = document.querySelector('#remove')

removeButton.addEventListener('click', clearGifs)
searchButton.addEventListener('click', getGif)

async function getGif(e) {
    e.preventDefault()

    let searchValue = searchInput.value
    let randomNum = Math.floor(Math.random() * 25)
    console.log(searchValue)
    const data = {
        params: {
        q: searchValue,
        api_key: "hFEKHsN9pwBhFs84SYbjYXNgU6n8QoBa",
        limit: 1,
        offset: randomNum
        }
        //offset notifies of the desired index, which is random so that a random gif is sent. limit says how many gifs are wanted
    }

    const response = await axios.get("https://api.giphy.com/v1/gifs/search", data)
    appendGif(response.data.data[0].images.original.url)
}

function appendGif(gifData) {
    const newGif = document.createElement('img')
    newGif.classList.add('gif')
    newGif.src = gifData
    gifTrack.append(newGif)
}

function clearGifs() {
    gifTrack.innerHTML = ''
}

