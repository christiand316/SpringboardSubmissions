function findRotationCount(arr, left = 0, right = arr.length - 1) {
    if (left > right) { // all indices have been exhausted and no matches found therefore array has no rotation 
      return 0;
    }
  
    let mid = Math.floor((left + right) / 2);
  
    if (arr[mid] > arr[mid + 1]) { // Index is larger than its successor therefore is pivot point
        return mid+1
    } else if (arr[left] <= arr[mid]) {
      return findRotationCount(arr, mid + 1, right);
    } else {
      return findRotationCount(arr, left, mid - 1);
    }
    
}

                              

module.exports = findRotationCount