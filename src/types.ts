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
  | { type: 'TOGGLE_PAID_STATUS'; payload: number }
  | { type: 'SET_CURRENT_MONTH'; payload: number }
  | { type: 'SET_CURRENT_YEAR'; payload: number };

export interface State {
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  togglePaidStatus: (id: number) => void;
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
}
