function extractValue(arr, key) {
    return arr.reduce(function(acc, current) {
        acc.push(current[key]);
        return acc;
    } , [] );
}

function vowelCount(str) {
    const vowel = 'aeiou'
    return str.toLowerCase().split('').reduce(function(acc, current) {
        let i = current;
        if(vowel.indexOf(i) !== -1){
            if(acc[i]) {
                acc[i]++;
            } else {
                acc[i] = 1;
            }
        }
        return acc;
    }, {});
}



function addKeyAndValue(arr, key, val) {
    return arr.reduce(function(acc, next, index) {
        acc[index][key] = val;
        return acc;
    },arr)
}





function partition(arr, callBack) {
    return arr.reduce(function(acc, current) {
        if(callBack(current)) {
            acc[0].push(current);
        } else {
            acc[1].push(current);
        }
        return acc;
    }, [[],[]] );
}

