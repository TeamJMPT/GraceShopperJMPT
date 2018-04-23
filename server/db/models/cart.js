const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
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

module.exports = Cart