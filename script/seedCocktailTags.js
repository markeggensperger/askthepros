const cocktails = require('./seedCocktails');

module.exports = cocktails.reduce((acc, cocktail, idx) => {
  const currentCocktailTags = cocktail.tagIds.map((tagId) => {
    return { cocktailId: idx + 1, tagId };
  });
  return acc.concat(currentCocktailTags);
}, []);
