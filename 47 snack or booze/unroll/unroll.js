function unroll(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(unroll(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

module.exports = unroll;
