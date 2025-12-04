// src/context/AppReducer.ts
import { State, Action } from '../types';

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
    default:
      return state;
  }
};
