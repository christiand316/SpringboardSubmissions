function countPairs(arr, target) {
    let count = 0;
    const numsSet = new Set();
  
    for (let num of arr) {
      if (numsSet.has(target - num)) {
        count++;
      }
      numsSet.add(num);
    }
  
    return count;
  }


  module.exports = countPairs