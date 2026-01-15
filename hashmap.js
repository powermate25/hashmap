console.log("HashMap!")
const clog = console.log

// Code

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor
        this.capacity = capacity
        this.buckets = new Array(capacity)
        this.createNode = class Node {
            constructor(key, value, nextNode = null) {
                this.key = key
                this.value = value
                this.nextNode = nextNode
            }
        }
        this.loadAlert = 0
        // this.loadAlert = this.loadState()
    }

    newNode(key, value, nextNode) {
        this.loadAlert += 1
        return new this.createNode(key, value, nextNode)
    }

    loadState() {
        let totalKeys = this.loadAlert
        let maxThreshold = this.loadFactor * this.capacity

        if (totalKeys < maxThreshold) { return false }
        else if (totalKeys === maxThreshold) {
            // clog("max threshold reached!")
            // clog(totalKeys)
            return true
        }
        
    }

    hash(key) {
        let hashCode = 0
        const primeNum = 31
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNum * hashCode + key.charCodeAt(i)
            hashCode %= this.capacity
        }
        return hashCode
    }

    set(key, value) {
        let index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        this.loadState()

        if ( this.loadState() ) {
            clog("📢Load factor reached!")
            clog("🔔 Will now double buckets number.")
            const bucketsBackup = this.buckets
            const newCapacity = this.capacity * 2
            const newBuckets = new Array(newCapacity)

            for (let x in bucketsBackup) {
                if ( bucketsBackup[x] ) {
                    let currHashCode = this.hash(bucketsBackup[x].key)
                    newBuckets[currHashCode] = bucketsBackup[x]
                }
            }

            this.capacity = newCapacity
            this.buckets = newBuckets 
        }

        
        const newData = this.newNode(key, value)
        let oldData = this.buckets[index]
        while ( oldData ) {
            if (oldData.key === newData.key ) {
                clog("Key already exist. Will now update data")
                oldData.value = newData.value
                this.loadAlert --
                return
            }
            oldData = oldData.nextNode
        }
        
        let collapsingData = this.buckets[index]

        while (collapsingData && collapsingData.nextNode ) {
        collapsingData = collapsingData.nextNode
        }

        if ( collapsingData ) {
            collapsingData.nextNode = newData
        }
        else {
            this.buckets[index] = newData
        }

        this.loadState()
    }

    get(searchKey) {
        let result = null
        for (let k in this.buckets) {
            let temp = this.buckets[k]
            while (temp) {
                // clog(temp)
                if(temp.key === searchKey) {
                    // clog("🚨 Found!")
                    return result = temp.value
                }
            temp = temp.nextNode
            }
            if (searchKey === this.buckets[k].key) {
                return result = this.buckets[k].value
            }
        }
        return result
    }

    has (searchKey) {
        let result = false
        for (let k in this.buckets) {
            let temp = this.buckets[k]
            while (temp) {
                // clog(temp)
                if(temp.key === searchKey) {
                    // clog("🚨 Found!")
                    return result = true
                }
            temp = temp.nextNode
            }
            if (searchKey === this.buckets[k].key) {
                return result = true
            }
        }
        return result
    }

    remove(searchKey) {
        // Main if condition start
        if ( this.has(searchKey) ) {
            let result = false
            // for loop start
            for (let k in this.buckets) {

                let temp = this.buckets[k]
                let prevN
                // while loop start
                while (temp) {
                    if (temp.key !== searchKey) {
                        prevN = temp
                    }

                    if(temp.key === searchKey) {
                        if(prevN) {
                            clog("♻ Found! Now removing nested node element.")
                            clog(temp)
                            prevN.nextNode = temp.nextNode
                            this.loadAlert --
                        }
                        else {
                            clog("♻ Found! Now removing Head node element")
                            clog(temp)
                            temp = temp.nextNode
                            this.buckets[k] = temp
                            this.loadAlert --
                        }
                        
                        return result = true
                    }

                temp = temp.nextNode
                }
                // while loop end

                if (searchKey === this.buckets[k].key) {
                    return result = true
                }
            }
            // for loop end

            this.loadAlert --
        }
        // Main if condition end
    }

    length() {
        return this.loadAlert
    }
    
    clear() {
        this.loadFactor = 0.75
        this.capacity = 16
        this.buckets = new Array(this.capacity)
        this.loadAlert = 0
    }

    keys() {
        let result = []
        for (let k in this.buckets) {
            if( this.buckets[k] ) {
                let temp = this.buckets[k]

                while (temp.nextNode) {
                result.push (temp.nextNode.key)
                temp = temp.nextNode
                }
                
                result.push(this.buckets[k].key)
            }
        }
        return result
    }

    values() {
        let result = []
        for (let k in this.buckets) {
            if( this.buckets[k] ) {
                let temp = this.buckets[k]
                
                while (temp.nextNode) {
                result.push (temp.nextNode.value)
                temp = temp.nextNode
                }
                
                result.push(this.buckets[k].value)
            }
        }
        return result
    }

    entries() {
        let result = []
        for (let key in this.buckets) {
            if( this.buckets[key] ) {
                let temp = this.buckets[key]

                while (temp.nextNode) {
                result.push ( [ temp.nextNode.key, temp.nextNode.value ] )
                temp = temp.nextNode
                }
                
                result.push( [this.buckets[key].key, this.buckets[key].value] )
            }
        }
        return result
    }

}

let test = new HashMap()

/* test.set('Fred', "Fred's first data 1")
test.set('Fred', "Fred's second data 2") */

/* test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')


clog(test.entries())

clog("📂 Final folder info: ")
clog(test) 

 */

export { HashMap, clog }


