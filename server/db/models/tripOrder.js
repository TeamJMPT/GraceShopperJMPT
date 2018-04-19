const Sequelize = require('sequelize')
const db = require('../db')

const TripOrder = db.define('tripOrder', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    unitPrice: {
        type: Sequelize.INTEGER
    },

    totalPrice: {
        type: Sequelize.INTEGER,
        get() {
            return this.quantity * this.unitPrice
        }
    }
})

module.exports = TripOrder