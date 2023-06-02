import { createStore, combineReducers } from 'redux';
import sortReducer from './sortReducer';
import filterReducer from './filterReducer';

const reducers = combineReducers({
  sort: sortReducer,
  filter: filterReducer,
});

const store = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;

export default store;
