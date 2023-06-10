import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import type {} from 'redux-thunk/extend-redux';
import sortReducer from './sortReducer';
import filterReducer from './filterReducer';
import ticketsReducer from './ticketsReducer';

const reducers = combineReducers({
  sort: sortReducer,
  filter: filterReducer,
  tickets: ticketsReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof reducers>;

export default store;
