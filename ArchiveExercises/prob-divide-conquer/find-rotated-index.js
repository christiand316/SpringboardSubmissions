function findRotatedIndex(arr, target) {
    let pivot = findPivot(arr)

    if (pivot > 0 && target >= arr[0] && target <= arr[pivot - 1]) {
        return binarySearch(arr, target, 0, pivot - 1);
      } else {
        return binarySearch(arr, target, pivot, arr.length - 1);
      }
  }
  
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
      return -1; // Target not found
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

function findPivot(arr, left = 0, right = arr.length - 1) {
    if (left > right) {
      return -1;
    }
  
    let mid = Math.floor((left + right) / 2);
  
    if (arr[mid] > arr[mid + 1]) { // Index is larger than its successor therefore is pivot point
      return mid + 1;
    } else if (arr[left] <= arr[mid]) {
      return findPivot(arr, mid + 1, right);
    } else {
      return findPivot(arr, left, mid - 1);
    }
}

module.exports = findRotatedIndex