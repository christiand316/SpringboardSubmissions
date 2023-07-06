function findFloor(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let floor = -1;
  
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
  
      if (arr[mid] === target) {
        return arr[mid];
      } else if (arr[mid] < target) {
        floor = arr[mid];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return floor;
  }

module.exports = findFloor