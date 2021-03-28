import axios from 'axios';

const SET_TAG = 'SET_TAG';

const setTag = (tag) => ({
  type: SET_TAG,
  tag,
});

export const getTag = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/tags/' + id);
      dispatch(setTag(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TAG:
      return action.tag;
    default:
      return state;
  }
};
