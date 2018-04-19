const User = require('./user');
const Category = require('./category');
const Trip = require('./trips');
const Order = require('./order');
const TripOrder = require('./tripOrder');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Category.belongsToMany(Trip, {through: 'TripCategory'});
 Trip.belongsToMany(Category, {through: 'TripCategory'});

 Order.belongsToMany(Trip, {through: TripOrder});
 Trip.belongsToMany(Order, {through: TripOrder});

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
  TripOrder
};
