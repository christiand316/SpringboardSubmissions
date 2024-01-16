function sameFrequency(num1, num2) {
    const strNum1 = num1.toString();
    const strNum2 = num2.toString();
  
    if (strNum1.length !== strNum2.length) return false;
  
    const countNum1 = {};
    const countNum2 = {};
  
    for (let i = 0; i < strNum1.length; i++) {
      countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1;
      countNum2[strNum2[i]] = (countNum2[strNum2[i]] || 0) + 1;
    }
  
    for (let key in countNum1) {
      if (countNum1[key] !== countNum2[key]) return false;
    }
  
    return true;
  }

  module.exports = {
    sameFrequency
  };