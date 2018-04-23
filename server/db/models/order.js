const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    status : {
        type: Sequelize.ENUM('pending', 'complete'),
        defaultValue: 'pending'
    },
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


