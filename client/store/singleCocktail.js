import axios from 'axios';

const SET_COCKTAIL = 'SET_COCKTAIL';

const setCocktail = (cocktail) => ({
  type: SET_COCKTAIL,
  cocktail,
});

export const getCocktail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/cocktails/' + id);
      dispatch(setCocktail(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_COCKTAIL:
      return action.cocktail;
    default:
      return state;
  }
};
