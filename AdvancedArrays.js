function doubleValues(arr) {
    let arrReturn = [];
    arr.forEach(function(num){
        arrReturn.push(num * 2);
    });
    return arrReturn;
}

function onlyEvenValues(arr) {
    let arrReturn = [];
    arr.forEach(function(num) {
        if (num % 2 === 0) {
            arrReturn.push(num);
        }
    });
    return arrReturn
}

function showFirstAndLast(arr) {
    let arrReturn = [];
    arr.forEach(function(num) {
        arrReturn.push(num[0] + num[num.length -1])
    });
    return arrReturn;
}

function addKeyAndValue(arr, key, val) {   
    arr.forEach(function(i) {
        i[key] = val;
    });
    return arr;
}

function vowelCount(str) {
    let returnObj = {}
    let arr = str.split('');

    arr.forEach(function(i) {
        const vowelList = 'AEIOUaeiou';
        if(vowelList.indexOf(i) !== -1) {
            console.log(vowelList(i))
        }
    });
}

function vowelCount(str) {
    let arr = str.split('');
    let returnObj = {};

    arr.forEach(function(i) {
        const vowelList = 'AEIOUaeiou';
        if (vowelList.indexOf(i) !== -1) {
            if (returnObj[i]) {
            returnObj[i]++;
            } else {
            returnObj[i] = 1;
            }
        }
    });
    return returnObj;
}

// all map methods

function doubleValuesWithMap(arr) {
    return arr.map(function(i) {
        return i * 2;
    });
}

function valTimesIndex(arr) {
    return arr.map(function(value , i) {
        return value * i;
    });
}

function extractKey(arr, key) {
    return arr.map(function(i) {
        return i[key];
    });
}

function extractFullName(arr) {
    return arr.map(function(i) {
        return i.first + i.last;
    });
}

// all filter methods

function filterByValue(arr, key) {
    return arr.filter(function(i) {
        return i[key] != undefined;
    });
}

function find(arr, val) {
    return arr.filter(function(i) {
        return i === val;
    });
}

function findInObj(arr, key, val) {
    return arr.filter(function(i) {
        return i[key] === val;
    });
}

function removeVowels(str) {
    let arr = str.split('');
    const vowelList = 'AEIOUaeiou';
    return str.split('').filter(function(i) {
        return vowelList.indexOf(i) === -1;
    }).join('').toLowerCase();
}

function doubleOddNumbers(arr) {
    let arrReturn = [];
    
    arr.forEach(function(i) {
        if (i % 2 !== 0) {
            arrReturn.push(i);
        }
    });
    return arrReturn.map(function(y) {
        return y * 2;
    });
}
