// convert to arrow function
const filterOutOdds = (...args) => args.filter(num => num % 2 === 0)

// making functions
function findMin(...arr) {
    return Math.min(...arr)
}

function mergeObjects(firstObj, secondObj) {
    return {...firstObj, ...secondObj}
}

function doubleAndReturnArgs(arr, ...arg) {
    return [...arr, ...arg].map(num => num * 2)
}


// slice and dice problem

const removeRandoms = (items) => {
    let removeIdx = Math.floor(Math.random() * items.length);
    return [...items.slice(0, removeIdx), ...items.slice(removeIdx + 1)];
}

const extend = (array1, array2) => {
    return [...array1, ...array2];
}


const addKeyVal = (obj, key, val) => {
    let returnObj = {...obj};
    returnObj[key] = val;
    return returnObj;
}

const removeKey = (obj, key) => {
    let returnObj = {...obj}
    delete returnObj[key]
    return returnObj;
}

const combine = (obj1, obj2) => {
    return {...obj1, ...obj2}
}

const update = (obj, key, val) => {
    let returnObj = {...obj};
    returnObj[key] = val
    return returnObj
}
