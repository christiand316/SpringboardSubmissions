function merge(arr1Arg, arr2Arg) {

    //Make this pure instead of inplace

    const arr1 = []
    const arr2 = []

    for (let i = 0; i < arr1Arg.length; i++) {
        arr1[i] = arr1Arg[i];
    }
    for (let i = 0; i < arr2Arg.length; i++) {
        arr2[i] = arr2Arg[i];
    }

    const results = []
    while ((arr1.length && arr2.length)) {
        if (arr1[0] < arr2[0]) results.push(arr1.shift())
        else results.push(arr2.shift())
    }
    while(arr1.length) {
        results.push(arr1.shift())
    }
    while(arr2.length) {
        results.push(arr2.shift())
    }
    return results
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr //Base case hit, array is sorted

    const middle = Math.floor((arr.length)/2)

    const left = mergeSort(arr.slice(0, middle))
    const right = mergeSort(arr.slice(middle))

    return merge(left, right)
}

module.exports = { merge, mergeSort};