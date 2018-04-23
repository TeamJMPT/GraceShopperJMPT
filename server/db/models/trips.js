const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./category')

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
        defaultValue: "http://chittagongit.com/images/no-image-icon/no-image-icon-5.jpg"
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
    },
    inventory: {
        type: Sequelize.INTEGER,
        defaultValue: 50
    },
    isAvailable: {
        type: Sequelize.VIRTUAL,
        get(){
            return this.inventory !== 0
        }
    }
}
// {
//     defaultScope: {
//         include: [
//             {model: Category }
//         ]
//     }
// }
)


module.exports = Trip
