const SET_ALL_FILTERS = 'SET_ALL_FILTERS';
const SET_FILTER_ALL = 'SET_FILTER_ALL';
const SET_FILTER_WITHOUT_TRANSFERS = 'SET_FILTER_WITHOUT_TRANSFERS';
const SET_FILTER_ONE_TRANSFER = 'SET_FILTER_ONE_TRANSFER';
const SET_FILTER_TWO_TRANSFERS = 'SET_FILTER_TWO_TRANSFERS';
const SET_FILTER_THREE_TRANSFERS = 'SET_FILTER_THREE_TRANSFERS';

interface StateFilter {
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

interface ActionSetFilterWithoutTransfers {
  type: typeof SET_FILTER_WITHOUT_TRANSFERS;
}

interface ActionSetFilterOneTransfer {
  type: typeof SET_FILTER_ONE_TRANSFER;
}

interface ActionSetFilterTwoTransfers {
  type: typeof SET_FILTER_TWO_TRANSFERS;
}

interface ActionSetFilterThreeTransfers {
  type: typeof SET_FILTER_THREE_TRANSFERS;
}

type Actions =
  | ActionSetFilterAll
  | ActionSetFilterWithoutTransfers
  | ActionSetFilterOneTransfer
  | ActionSetFilterTwoTransfers
  | ActionSetFilterThreeTransfers
  | ActionSetAllFilters;

const initialState: StateFilter = {
  all: false,
  withoutTransfers: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
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

    case SET_FILTER_WITHOUT_TRANSFERS:
      return {
        ...state,
        withoutTransfers: !state.withoutTransfers,
      };

    case SET_FILTER_ONE_TRANSFER:
      return {
        ...state,
        oneTransfer: !state.oneTransfer,
      };

    case SET_FILTER_TWO_TRANSFERS:
      return {
        ...state,
        twoTransfers: !state.twoTransfers,
      };

    case SET_FILTER_THREE_TRANSFERS:
      return {
        ...state,
        threeTransfers: !state.threeTransfers,
      };

    default:
      return state;
  }
};

export const setAllFilters = (value: boolean): ActionSetAllFilters => ({ type: SET_ALL_FILTERS, payload: value });

export const setFilterAll = (value: boolean): ActionSetFilterAll => ({ type: SET_FILTER_ALL, payload: value });

export const setFilterWithoutTransfers = (): ActionSetFilterWithoutTransfers => ({
  type: SET_FILTER_WITHOUT_TRANSFERS,
});

export const setFilterOneTransfer = (): ActionSetFilterOneTransfer => ({
  type: SET_FILTER_ONE_TRANSFER,
});

export const setFilterTwoTransfers = (): ActionSetFilterTwoTransfers => ({
  type: SET_FILTER_TWO_TRANSFERS,
});

export const setFilterThreeTransfers = (): ActionSetFilterThreeTransfers => ({
  type: SET_FILTER_THREE_TRANSFERS,
});

export default filterReducer;
