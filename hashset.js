console.log("HashSet!")
const clog = console.log

class HashSet {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor
        this.capacity = capacity
        this.buckets = new Array(capacity)
        this.createNode = class Node {
            constructor(key, nextNode = null) {
                this.key = key
                this.nextNode = nextNode
            }
        }
        this.loadAlert = 0
    }

    newNode(key, nextNode) {
        this.loadAlert += 1
        return new this.createNode(key, nextNode)
    }

    loadState() {
        let totalKeys = this.loadAlert
        let maxThreshold = this.loadFactor * this.capacity
        if (totalKeys < maxThreshold) return false
        else if (totalKeys === maxThreshold) return true
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

    set(key) {
        let index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        this.loadState()

        // Now checking for existing data before incrementing loadState
        if ( this.loadState() && !this.has(key) ) {
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

        const newData = this.newNode(key)
        let oldData = this.buckets[index]
        while ( oldData ) {
            if (oldData.key === newData.key ) {
                oldData.key = newData.key
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
                    if(temp.key === searchKey) {
                        return result = temp.key
                    }
                temp = temp.nextNode
                }

                if (searchKey === this.buckets[k].key) {
                    return result = this.buckets[k].key
                }
            }
            return result
        }
    
        has (searchKey) {
            let result = false
            for (let k in this.buckets) {
                let temp = this.buckets[k]
                while (temp) {
                    if(temp.key === searchKey) {
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
                                prevN.nextNode = temp.nextNode
                                this.loadAlert --
                            }
                            else {
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
                    result.push (temp.nextNode.key)
                    temp = temp.nextNode
                    }
                    
                    result.push(this.buckets[k].key)
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
                    result.push ( [ temp.nextNode.key] )
                    temp = temp.nextNode
                    }
                    
                    result.push( [this.buckets[key].key] )
                }
            }
            return result
        }

}

export { HashSet }