function addCommas(incoming: string) {
    const [leftSide, rightSide] = incoming.split('.')
    const isNegative = leftSide[0] === '-'
    const leftSideDigits = leftSide.replace('-', '').split('')
    const leftSideWithCommas: string[] = []
    let counter = 0
    for (let i = leftSideDigits.length - 1; i >= 0; i--) {
        leftSideWithCommas.unshift(leftSideDigits[i])
        counter++
        if (counter === 3 && i !== 0) {
            leftSideWithCommas.unshift(',')
            counter = 0
        }
    }
    const leftSideWithCommasString = leftSideWithCommas.join('')
    if(rightSide !== undefined) { //using undefined instead of 0 because falsy values
        return isNegative ? `-${leftSideWithCommasString}.${rightSide}` : `${leftSideWithCommasString}.${rightSide}`
    }
    else {
        return isNegative ? `-${leftSideWithCommasString}` : `${leftSideWithCommasString}`
    }
}

export {addCommas}