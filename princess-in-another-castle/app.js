//////////////////////////////////// Princess in another castle /////////////////////////////////////////
const readline = require('readline-sync')

let selectedName;

let intervalId;

const names = ["Mario", "Luigi"]

while(!selectedName){
    const index = readline.keyInSelect(names, 'Please pick your Hero:');
    if (index === -1){
        console.log('BYE!')
        process.exit(0)
    } else {
        selectedName = names[index]
    }
}
class Player {
    constructor(name, totalCoins, status, hasStar) {
        this.name = name
        this.totalCoins = totalCoins
        this.status = status
        this.hasStar = hasStar
}
    setName(namePicked) {
        this.name = namePicked
    }
    gotHit() {
        console.log(`
        You got hit!`)
        if (this.status === "Small") {
                console.log(`
        Game over! You are dead!
        Name: ${this.name}
        Status: Dead
        Total coins: ${this.totalCoins}`)
                clearInterval(intervalId)
        } else if (this.status === "Big") {
            this.status = "Small"
        } else if (this.status === "Powered up") {
            this.status = "Big"
        } 
        if (this.hasStar === true){
            console.log(`
        Your star proteced you!`)
            this.hasStar = false
            this.status = "Powered up"
        }
       // change status Statuses go from "Powered Up" to "Big" to "Small" to "Dead"
    }
    gotPoweredUp() {
        if (this.status === "Powered up") {
            this.hasStar = true
            console.log(`
        STAR IS ACTIVE!`)
        } else if (this.status === "Big") {
            this.status = "Powered up"
        } else if (this.status === "Small") {
            this.status = "Big"
        }
        // (Statuses go from "Small" to "Big" to "Powered Up".
        //  If you are Powered Up and it hits this function, you get a star)
    }

    addcoin() {
        console.log(`
        Got a coin!`)
        this.totalCoins ++
        
    }
    print() {
        console.log(`
        Name: ${this.name}
        Status: ${this.status}
        Total coins: ${this.totalCoins}`)
    }
}
const mario = new Player(selectedName, 0, "Powered up", false)

const randomRange = () => {
    mario.print()
    const random = Math.floor(Math.random() * 3)
    if (random === 0){
        mario.gotHit()
    } else if (random === 1) {
        mario.gotPoweredUp()
    } else if (random === 2) {
        mario.addcoin()
    }
}

intervalId = setInterval(randomRange, 1500) 


