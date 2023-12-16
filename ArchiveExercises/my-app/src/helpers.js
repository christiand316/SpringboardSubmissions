function choice(arr) {
    let index = Math.floor(Math.random() * arr.length)
    return arr[index]
}

function remove(arr, itemToRemove) {
    return arr.filter((item) => item !== itemToRemove)
}

export { choice, remove }