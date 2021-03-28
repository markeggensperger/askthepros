import axios from 'axios';
import store from './index';

const SET_COCKTAILS = 'SET_COCKTAILS';

const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
});

export const getCocktails = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/cocktails/');
      dispatch(setCocktails(data));
    } catch (err) {
      console.error(err);
    }
  };
};
export const updateCocktails = () => {
  return async (dispatch) => {
    try {
      const { likes, dislikes } = store.getState().selections;
      const { data } = await axios.post('/api/cocktails/', { likes, dislikes });
      dispatch(setCocktails(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_COCKTAILS:
      return action.cocktails;
    default:
      return state;
  }
};
