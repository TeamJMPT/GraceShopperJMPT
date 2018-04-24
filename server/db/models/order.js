const Sequelize = require('sequelize')
const db = require('../db')
const { Trip } = require('./index')
//This is our 'line items'
const Order = db.define('order', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: Sequelize.INTEGER
    },
    subTotal: {
        type: Sequelize.INTEGER,
        get() {
            return this.quantity * this.unitPrice
        }
    }
})

module.exports = Order
