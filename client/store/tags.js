/* eslint-disable no-case-declarations */
import axios from 'axios';
import store from './index';

const SET_TAGS = 'SET_TAGS';

const setTags = (tags) => ({
  type: SET_TAGS,
  tags,
});

const popNext = () => ({
  type: popNext,
});

export const getTags = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/tags/');
      dispatch(setTags(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateTags = () => {
  return async (dispatch) => {
    try {
      const { selections, cocktails } = store.getState();
      const queriedIds = selections.all.map((tag) => tag.id);
      const cocktailIds = cocktails.map((cocktail) => cocktail.id);
      const { data } = await axios.post('/api/tags/', {
        queriedIds,
        cocktailIds,
      });
      dispatch(setTags(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    default:
      return state;
  }
};
