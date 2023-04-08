// 1.
function createInstructor(firstName, lastName){
    return {
      firstName,
      lastName
    }
}

// 2.
var favoriteNumber = 42;

var instructor = {
  firstName: "Colt",
  [favoriteNumber] : "That is my favorite!"
}

// 3.
var instructor = {
    firstName: "Colt",
    sayHi() {
      return "Hi!";},
    sayBye(){
      return this.firstName + " says bye!";
    }
}

// 4.
const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
d.bark()  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
s.bleet() //"BAAAAaaaa"

function createAnimal(species, verb, noise) {
    return {
        species, [verb]() {
            return species + ' gos ' + noise;
        }
    }
}