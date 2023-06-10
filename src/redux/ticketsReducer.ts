import { ThunkDispatch } from 'redux-thunk';
import api from '../services/api';

const SET_TICKETS = 'SET_TICKETS';
const SET_IS_ERROR = 'SET_IS_ERROR';

interface ITicket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета туда
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета обратно
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    }
  ];
}

interface IStateTickets {
  tickets: ITicket[];
  isError: boolean;
}

interface IActionSetTickets {
  type: typeof SET_TICKETS;
  payload: ITicket[];
}

interface IActionSetIsError {
  type: typeof SET_IS_ERROR;
  payload: boolean;
}

type Actions = IActionSetTickets | IActionSetIsError;

const initialState: IStateTickets = {
  tickets: [],
  isError: false,
};

const ticketsReducer = (state = initialState, action: Actions): IStateTickets => {
  switch (action.type) {
    case SET_TICKETS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      };

    case SET_IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export const setTickets = (tickets: ITicket[]): IActionSetTickets => ({ type: SET_TICKETS, payload: tickets });
export const setIsError = (value: boolean): IActionSetIsError => ({ type: SET_IS_ERROR, payload: value });

let errorsNumber = 0;

export const getTickets =
  () => async (dispatch: ThunkDispatch<IStateTickets, void, Actions>, getState: () => IStateTickets) => {
    if (getState().isError) {
      dispatch(setIsError(false));
    }

    try {
      if (!api.searchId) {
        const initOk = await api.initApp();
        if (!initOk) {
          dispatch(getTickets());
          return;
        }
      }
      const data = await api.getTickets();
      dispatch(setTickets(data.tickets));

      if (!data.stop) {
        dispatch(getTickets());
      }

      errorsNumber = 0;
    } catch (error) {
      errorsNumber++;
      errorsNumber > 5 ? dispatch(setIsError(true)) : dispatch(getTickets());
    }
  };

export default ticketsReducer;
