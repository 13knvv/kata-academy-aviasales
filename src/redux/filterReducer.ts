const SET_ALL_FILTERS = 'SET_ALL_FILTERS';
const SET_FILTER_ALL = 'SET_FILTER_ALL';
const SET_FILTER = 'SET_FILTER';

interface StateFilter {
  [key: string]: boolean;
  all: boolean;
  withoutTransfers: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

interface ActionSetAllFilters {
  type: typeof SET_ALL_FILTERS;
  payload: boolean;
}

interface ActionSetFilterAll {
  type: typeof SET_FILTER_ALL;
  payload: boolean;
}

interface ActionSetFilter {
  type: typeof SET_FILTER;
  payload: string;
}

type Actions = ActionSetFilterAll | ActionSetAllFilters | ActionSetFilter;

const initialState: StateFilter = {
  all: true,
  withoutTransfers: true,
  oneTransfer: true,
  twoTransfers: true,
  threeTransfers: true,
};

const filterReducer = (state = initialState, action: Actions): StateFilter => {
  switch (action.type) {
    case SET_ALL_FILTERS:
      return {
        all: action.payload,
        withoutTransfers: action.payload,
        oneTransfer: action.payload,
        twoTransfers: action.payload,
        threeTransfers: action.payload,
      };

    case SET_FILTER_ALL:
      return {
        ...state,
        all: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };

    default:
      return state;
  }
};

export const setAllFilters = (value: boolean): ActionSetAllFilters => ({ type: SET_ALL_FILTERS, payload: value });

export const setFilterAll = (value: boolean): ActionSetFilterAll => ({ type: SET_FILTER_ALL, payload: value });

export const setFilter = (key: string): ActionSetFilter => ({ type: SET_FILTER, payload: key });

export default filterReducer;
