function countZeroes(arr) {
    let pivot = findPivot(arr) 
    if (pivot === -1) {
        return 0
    } else {
        return arr.length - pivot
    }

}

function findPivot(arr, left = 0, right = arr.length - 1) {
    if (left > right) {
      return -1; // Target not found
    }
  
    let mid = Math.floor((left + right) / 2);
  
    if (arr[mid] === 0 && arr[mid-1] !== 0) {
      return mid; // desired value from helper function
    } else if (arr[mid] == 1) {
      return findPivot(arr, mid + 1, right); // search in right half
    } else if (arr[mid] == 0) {
      return findPivot(arr, left, mid - 1); // search in left half
    }
    return -1
}



module.exports = countZeroes

