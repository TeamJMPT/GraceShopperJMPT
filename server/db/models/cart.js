const Sequelize = require('sequelize')
const db = require('../db')

//this is our 'Order' for a user
const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  },
  address: {
    type: Sequelize.STRING
  },
  // total: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
})

module.exports = Cart;
