const User = require('./user');
const Category = require('./category');
const Trip = require('./trips');
const Order = require('./order');
const Cart = require('./cart');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 // your order table is currently an order line items table
 	// separate into order and lineitem table
 	// can associate lineItem.belongsTo (product / order)
 	// you can working with lineItem directly if you want 
 	// belongsToMany, addTrips might still make it difficult to add Quant and purchasePrice to join table -- KHLW

 Category.belongsToMany(Trip, {through: 'TripCategory'});
 Trip.belongsToMany(Category, {through: 'TripCategory'});

 Order.belongsToMany(Trip, {through: Cart});
 Trip.belongsToMany(Order, {through: Cart});

 Order.belongsTo(User)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Trip,
  Order,
};
