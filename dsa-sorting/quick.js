/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, low = 0, high = arr.length - 1) {
    let pivot = arr[low]
    let pivotIndex = low

    for (let i = low + 1; i <= high; i++) {
        if (pivot > arr[i]) {
            pivotIndex++
            let temp = arr[i]
            arr[i] = arr[pivotIndex]
            arr[pivotIndex] = temp
        }
    }

    let temp = arr[low]
    arr[low] = arr[pivotIndex]
    arr[pivotIndex] = temp

    return pivotIndex
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pivotIndex = pivot(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)
    }
    return arr
}

module.exports = {pivot, quickSort};