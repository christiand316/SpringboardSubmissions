function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) 
            minIndex = j            
        }
        
        if (minIndex !== i) {
            const temp = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = temp
        }
    }
    return arr
}

module.exports = selectionSort;