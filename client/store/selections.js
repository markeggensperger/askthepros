/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
import axios from 'axios';

const SELECT = 'SELECT';
const REMOVE_SELECTION = 'REMOVE_SELECTION';
const RESET = 'RESET';

export const select = (tag, preference) => ({
  type: SELECT,
  tag,
  preference,
});

export const removeSelection = (tag) => ({
  type: REMOVE_SELECTION,
  tag,
});

export const reset = () => ({
  type: RESET,
});

const initialState = { likes: [], dislikes: [], ignores: [], all: [] };

export default (state = initialState, action) => {
  const nextState = { likes: [], dislikes: [], ignores: [], all: [] };
  switch (action.type) {
    case SELECT:
      const { tag, preference } = action;
      nextState.all = [
        ...state.all.filter((thisTag) => thisTag.id !== tag.id),
        { ...tag, preference },
      ];
      nextState.all.forEach((tag) => nextState[tag.preference].push(tag.id));
      return nextState;
    case REMOVE_SELECTION:
      nextState.all = state.all.filter(
        (thisTag) => thisTag.id !== action.tag.id
      );
      nextState.all.forEach((tag) => nextState[tag.preference].push(tag.id));
      return nextState;
    case RESET:
      return initialState;
    default:
      return state;
  }
};
