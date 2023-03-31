// objects 1.
let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); // ? 8
console.log(yearNeptuneDiscovered); // ? 1846

// objects 2.
let planetFacts = {
    numPlanets: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };
  
  let {numPlanets, ...discoveryYears} = planetFacts;
  
  console.log(discoveryYears); // {yearNeptuneDiscovered : 1846 , yearMarsDiscovered : 1659}

  // objects 3. 
  function getUserData({firstName, favoriteColor="green"}){
    return `Your name is ${firstName} and you like ${favoriteColor}`;
  }
  
  getUserData({firstName: "Alejandro", favoriteColor: "purple"}) // ? 'Your name is Alejandro and you like purple'
  getUserData({firstName: "Melissa"}) // ? 'Your name is Melissa and you like green'
  getUserData({}) // 'Your name is undefined and you like green'

// array 1.
let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // 'Maya'
console.log(second); // ?'Marisa'
console.log(third); // 'Chi'

// array 2.
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
    "Raindrops on roses",
    "whiskers on kittens",
    "Bright copper kettles",
    "warm woolen mittens",
    "Brown paper packages tied up with strings"
  ]
  
  console.log(raindrops); // 'Raindrops on roses'
  console.log(whiskers); // 'Whiskers on kittens'
  console.log(aFewOfMyFavoriteThings); // 'Bright copper kettles'

// array 3.
let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // [10, 20, 30]

// es2015 refactoring 1.
const obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };

const {a,b} = obj.numbers

// es2015 refactoring 2.
var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;

[arr[0] , arr[1]] = [arr[1] , arr[0]]

// es2015 refactoring 3.
raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre'])

let raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest})
/*
  {
    first: "Tom",
    second: "Margaret",
    third: "Allison",
    rest: ["David", "Pierre"]
  }
*/