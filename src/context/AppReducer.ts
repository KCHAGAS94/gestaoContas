import { State, Action, User } from '../types';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'TOGGLE_PAID_STATUS':
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload
            ? { ...transaction, paid: !transaction.paid }
            : transaction
        ),
      };
    case 'SET_CURRENT_MONTH':
      return {
        ...state,
        currentMonth: action.payload,
      };
    case 'SET_CURRENT_YEAR':
      return {
        ...state,
        currentYear: action.payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        transactions: action.payload.transactions,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        transactions: [],
      };
    default:
      return state;
  }
};
