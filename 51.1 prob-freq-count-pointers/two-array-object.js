function twoArrayObject(keys, values) {
    let result = {};
  
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = values[i] !== undefined ? values[i] : null;
    }
  
    return result;
  }

  module.exports = {
    twoArrayObject
  };