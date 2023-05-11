function hasOddNumber(arr) {
    return arr.some(function(i) {
        return i % 2 === 0;
    });
}

function hasAZero(num) {
    return num.toString().split('').some(function(val){
        return val === '0';
    });
}

function hasOnlyOddNumbers(arr) {
    return arr.every(function(i) {
        return i % 2 !== 0
    });
}

function hasNoDuplicates(arr) {
    return arr.every(function(val, i) {
      return arr.indexOf(val) === i;
    });
  }

function hasCertainKey(arr, key) {
    return arr.every(function(i) {
        return key in i;
    });
}

function hasCertainValue(arr, key, val) {
    return arr.every(function(i) {
        return i[key] == val;
    });
}
