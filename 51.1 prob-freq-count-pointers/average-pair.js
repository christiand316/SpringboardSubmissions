// add whatever parameters you deem necessary
function averagePair(arr, avg) {
    if (arr.length < 2) {
      return false;
    }
  
    let start = 0;
    let end = arr.length - 1;
  
    while (start < end) {
      let tempAvg = (arr[start] + arr[end]) / 2;
  
      if (tempAvg === avg) {
        return true;
      } else if (tempAvg < avg) {
        start++;
      } else {
        end--;
      }
    }
  
    return false;
  }


  module.exports = averagePair;