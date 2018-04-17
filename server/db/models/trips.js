const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        },
        defaultValue: "http://chittagongit.com/images/no-image-icon/no-image-icon-5.jpg"
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
    }
})


module.exports = Trip
