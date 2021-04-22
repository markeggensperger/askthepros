import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// import cocktailReducer from './cocktails';
// import tagReducer from './tags';
// import selectionReducer from './selections';
// import singleCocktailReducer from './singleCocktail';
// import singleTagReducer from './singleTag';
// import allTagsReducer from './allTags';
import bartenderReducer from './bartender'

// const appReducer = combineReducers({
//   bartender: bartenderReducer,
//   cocktails: cocktailReducer,
//   tags: tagReducer,
//   selections: selectionReducer,
//   singleCocktail: singleCocktailReducer,
//   singleTag: singleTagReducer,
//   allTags: allTagsReducer,
// });

const middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
  // createLogger({ collapsed: true }),
];

const store = createStore(
  bartenderReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
