const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    status : {
        type: Sequelize.ENUM('pending', 'complete'), // cart === pending order. If you want, add a sessionId attribute so you can associate with authenticatedd user OR unauthenticated user (make sure you check) -- KHLW
        defaultValue: 'pending'
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false // defaultValue, min  -- KHLW
    },
// AHHHH white space?! -- KHLW
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

// Order.beforeSave((order) => {

// })

module.exports = Order
