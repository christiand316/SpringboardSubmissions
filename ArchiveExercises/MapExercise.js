// 1. {1, 2, 3, 4}

// 2. 'ref'

/* 3.
0 : {Array(3) => true}
1 : {Array(3) => false}
*/

const hasDuplicate = arr => new Set(arr).size !== arr.length

// vowel count

function vowelCount(str) {
    const returnVowel = new Map()
    const checkVowel = letter => 'aeiou'.includes(letter)
    const lowerStr = str.toLowerCase();

    for(let idx of lowerStr){
        
        if(checkVowel(idx)) {
            if(returnVowel.has(idx)) {
                returnVowel.set(idx, returnVowel.get(idx) +1)
            } else {
                returnVowel.set(idx, 1)
            }
        }
    }
    return returnVowel;
}
