function getDigit(a, i) {
    return Math.floor(Math.abs(a) / Math.pow(10, i) % 10)
}

function digitCount(num) {
    if (!num) return 1
    return Math.floor(Math.log10(num) + 1)
}

function radixSort(arr) {
    const maxDigits = mostDigits(arr)

    for (let i = 0; i < maxDigits; i++) {
        const buckets = Array.from({length: 10}, () => [])
        
        for (const num of arr) {
            const digit = getDigit(num, i)
            buckets[digit].push(num)
        }
        arr = [].concat(...buckets)
    }

    return arr
}

function mostDigits(arr) {
    let maximum = 0
    for (const num of arr) {
        maximum = Math.max(maximum, Math.floor(Math.log10(Math.abs(num))) + 1)
    }
    return maximum
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };