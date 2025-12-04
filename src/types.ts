// src/types.ts

export interface Transaction {
  id: number;
  text: string;
  amount: number;
  date: string;
  paid: boolean;
}

export type Action =
  | { type: 'DELETE_TRANSACTION'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'TOGGLE_PAID_STATUS'; payload: number };

export interface State {
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  togglePaidStatus: (id: number) => void;
}
