// import {} from "./hashmap.js"
import { clog, HashMap } from "./hashmap.js"
import { HashSet } from "./hashset.js"

// HashMap
clog("HashMap Logger")
let testHashMap = new HashMap()
testHashMap.set('apple', 'red')
testHashMap.set('banana', 'yellow')
testHashMap.set('carrot', 'orange')
testHashMap.set('dog', 'brown')
testHashMap.set('elephant', 'gray')
testHashMap.set('frog', 'green')
testHashMap.set('grape', 'purple')
testHashMap.set('hat', 'black')
testHashMap.set('ice cream', 'white')
testHashMap.set('jacket', 'blue')
testHashMap.set('kite', 'pink')
testHashMap.set('lion', 'golden')
testHashMap.set('lion', 'golden now updated') // Just update the data without incrementing loadState
testHashMap.set('lion', 'golden now updated again 3') // Just update the data without incrementing loadState
testHashMap.set('moon', 'silver')
testHashMap.set('moon', 'Moon data updated now') // Just update the data without incrementing loadState

clog(testHashMap.has("lion"))  
clog(testHashMap)

// HashSet
clog("HashSet Logger")
let testHashSet = new HashSet()
testHashSet.set('apple')
testHashSet.set('banana')
testHashSet.set('carrot')
testHashSet.set('dog')
testHashSet.set('elephant')
testHashSet.set('frog')
testHashSet.set('grape')
testHashSet.set('hat')
testHashSet.set('ice cream')
testHashSet.set('jacket')
testHashSet.set('kite')
testHashSet.set('lion')
testHashSet.set('lion') // Just update the data without incrementing loadState
testHashSet.set('moon')


clog( testHashSet.has("moon") )
clog(testHashSet) 


