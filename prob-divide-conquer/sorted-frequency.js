function sortedFrequency(arr, target) {
    let checkFrom = binarySearch(arr, target) //use this and increment down and up until a value is outside of range... alternatively two different functions could find the first and last index of the target number for larger arrays
    let first;
    let last;

    for (let i = 0; i < arr.length; i++){
        if (arr[checkFrom+i] !== target) {
            last = i
            break
        }
    }
    for (let i = 0; i < arr.length; i++){
        if (arr[checkFrom-i] !== target) {
            first = i
            break 
        }
    }
    return first+last-1
}

function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
      return -1; // target not found
    }
  
    let mid = Math.floor((left + right) / 2);
  
    if (arr[mid] === target) {
      return mid; // desired value from helper function
    } else if (arr[mid] < target) {
      return binarySearch(arr, target, mid + 1, right); // search in right half
    } else {
      return binarySearch(arr, target, left, mid - 1); // search in left half
    }
}

module.exports = sortedFrequency