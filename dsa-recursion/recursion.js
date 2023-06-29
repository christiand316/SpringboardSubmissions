/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i == nums.length) {
    return 1;
}
 return nums[i] * product(nums, i+1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, longestWord = 0) {
  if (i == words.length) {
    return longestWord
  }
  if (words[i].length > longestWord) {
    longestWord = words[i].length

  }
  return longest(words, i + 1, longestWord)
}

/** everyOther: return a string with every other letter. */

function everyOther(str, i = 0, newString = '') {
  if (i >= str.length) {
    return newString
  }
  newString += str[i]
  return everyOther(str, i + 2, newString)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, i = 0) {
  if (str.length === 1) {
    return true
  }
  let frontCheckIndex = i
  let backCheckIndex = str.length - i - 1

  if (frontCheckIndex >= backCheckIndex) {
    return true
  }

  if (str[frontCheckIndex] !== str[backCheckIndex]) {
    return false
  }
  return isPalindrome(str, i + 1)

}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if (i === arr.length) {
    return -1
  }
  if (arr[i] === val) {
    return i
  }
  return findIndex(arr, val, i + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i = 0, newString = '') {
  if (str.length === newString.length) {
    return newString
  }
  newString += str[str.length - i - 1]
  return revString(str, i + 1, newString)
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  const result = [];

  function extractStringValues(input) {
    if (typeof input === 'string') {
      result.push(input);
    } else if (typeof input === 'object') {
      for (let key in input) {
        extractStringValues(input[key]);
      }
    }
  }

  extractStringValues(obj);
  return result;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, front = 0, back = arr.length) {
  let middle = Math.floor((front + back) / 2)
  if (front > back) {
    return -1
  }
  if (arr[middle] === val ) {
    return middle
  }
  // front half will be search and back value will be replaced with middle-1
  if (arr[middle] > val){
    return binarySearch(arr, val, front, middle - 1)
  }
  //if middle element is < val then the back half of the array will be searched
  return binarySearch(arr, val, middle + 1, back)
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
