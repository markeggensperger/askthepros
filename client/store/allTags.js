/* eslint-disable no-case-declarations */
import axios from 'axios';

const SET_ALL_TAGS = 'SET_ALL_TAGS';
const SELECT = 'SELECT';
const REMOVE_SELECTION = 'REMOVE_SELECTION';
const RESET = 'RESET';

const setAllTags = (tags) => ({
  type: SET_ALL_TAGS,
  tags,
});

export const getAllTags = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/tags/');
      dispatch(setAllTags(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_ALL_TAGS:
      return action.tags.map((tag) => ({ ...tag, value: parseInt(tag.value) }));
    case SELECT:
      return state.map((tag) => {
        if (tag.id === action.tag.id) {
          return { ...tag, preference: action.preference };
        } else {
          return tag;
        }
      });
    case REMOVE_SELECTION:
      return state.map((tag) => {
        if (tag.id === action.tag.id) {
          return { ...tag, preference: '' };
        } else {
          return tag;
        }
      });
    case RESET:
      return state.map((tag) => ({ ...tag, preference: '' }));
    default:
      return state;
  }
};
