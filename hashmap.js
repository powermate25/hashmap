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
        this.loadAlert = ""
        // this.loadAlert = this.loadState()
    }

    newNode(key, value, nextNode) {
        return new this.createNode(key, value, nextNode)
    }

    loadState() {
        let totalKeys = 0
        let maxThreshold = this.loadFactor * this.capacity

        for (let key in this.buckets) {
            if (key) { totalKeys += 1 }
        }

        this.loadAlert = totalKeys

        if (totalKeys < maxThreshold) { return false }
        else if (totalKeys === maxThreshold) {
            clog("max threshold reached!")
            clog(totalKeys)
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

        const newData = this.newNode(key, value)
        this.loadState()

        if ( !this.loadState() ) {
            let oldData = this.buckets[index]
            //
            //
            //
                if (oldData && oldData.key === newData.key ) {
                    clog("Key already exist. Will now update data")
                    oldData.value = newData.value
                }
                else { this.buckets[index] = newData }
        }

        else if ( this.loadState() ) {
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
        this.loadState()
    }
    
}

let test = new HashMap()

test.set('Fred', "Fred's first data 1")
test.set('Fred', "Fred's second data 2")





clog("📂 Folder info: ")
clog(test)
