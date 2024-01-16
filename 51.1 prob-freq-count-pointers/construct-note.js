function constructNote(message, letters) {
    const letterCounts = {};

    for (let letter of letters) {
        if (!letterCounts[letter]) {
            letterCounts[letter] = 0;
        }
        letterCounts[letter]++;
    }

    for (let letter of message) {
        if (!letterCounts[letter] || letterCounts[letter] <= 0) {
            return false;
        }
        letterCounts[letter]--;
    }

    return true;
}

module.exports = constructNote;