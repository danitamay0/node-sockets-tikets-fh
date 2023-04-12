const path = require('path')
const fs = require('fs')

class Tiket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}


class TiketControl {
    constructor() {
        this.last = 0
        this.today = new Date().getDate()
        this.tikets = []
        this.last4 = []

        this.init()
    }


    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tikets: this.tikets,
            last4: this.last4,
        }
    }

    init() {
        const { today, tikets, last, last4 } = require('../db/data.json')

        if (today === this.today) {
            this.last = last
            this.today = today
            this.tikets = tikets
            this.last4 = last4
        } else {
            this.saveDb()
        }
    }

    saveDb() {
        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    nextTiket() {
        this.last += 1
        const tiket = new Tiket(this.last, null)
        this.tikets.push(tiket)

        this.saveDb()
        return 'Tiket ' + tiket.numero
    }

    atenderTiket(escritorio) {
        if (this.tikets.length === 0) {
            return null
        }

        const tiket = this.tikets.shift()
        tiket.escritorio = escritorio

        this.last4.unshift(tiket)


        if (this.last4.length > 4) {
            this.last4.splice(-1, 1)
        }

        this.saveDb()

        return tiket

    }
}

module.exports = TiketControl