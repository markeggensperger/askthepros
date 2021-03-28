const User = require('./user')
const Cocktail = require('./cocktails');
const Tag = require('./tags');
const CocktailTag = require('./cocktailTags');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Cocktail.belongsToMany(Tag, {
  through: 'cocktail_tags',
});
Tag.belongsToMany(Cocktail, {
  through: 'cocktail_tags',
});

module.exports = {
  User,
  Cocktail,
  Tag,
  CocktailTag,
}
