const SET_SORT_BY = 'SET_SORT_BY';

type sortBy = 'cheap' | 'fast' | 'optimal';

interface StateSort {
  sortBy: sortBy;
}

interface ActionSetSortBy {
  type: typeof SET_SORT_BY;
  payload: sortBy;
}

type Actions = ActionSetSortBy;

const initialState: StateSort = {
  sortBy: 'cheap',
};

const sortReducer = (state = initialState, action: Actions): StateSort => {
  switch (action.type) {
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };

    default:
      return state;
  }
};

export const setSortBy = (by: sortBy): ActionSetSortBy => ({ type: SET_SORT_BY, payload: by });

export default sortReducer;
