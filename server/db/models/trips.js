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
    imageURL: {
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
        type: Sequelize.STRING,
    }
})


module.exports = Trip
