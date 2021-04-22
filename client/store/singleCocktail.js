import cocktailSeed from '../../script/seedCocktails'

const SET_COCKTAIL = 'SET_COCKTAIL';

export const setCocktail = (id) => ({
  type: SET_COCKTAIL,
  id,
});

export default (state = {}, action) => {
  switch (action.type) {
    case SET_COCKTAIL:
      return cocktailSeed[action.id - 1];
    default:
      return state;
  }
};
