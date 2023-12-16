
import fruits from './Foods'
import { choice , remove } from './helpers'

let fruit = choice(fruits)

console.log(`I would like one ${ fruit } please`)
console.log(`Heres a ${ fruit }`)
console.log('Delicious! May I have another one?')

console.log(`I am sorry we are all out of that fruit, we have ${ fruits.length -1}`)
remove(fruits, fruit);