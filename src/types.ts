// src/types.ts

export interface Transaction {
  id: number;
  text: string;
  amount: number;
  date: string;
  paid: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type Action =
  | { type: 'DELETE_TRANSACTION'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'TOGGLE_PAID_STATUS'; payload: number }
  | { type: 'SET_CURRENT_MONTH'; payload: number }
  | { type: 'SET_CURRENT_YEAR'; payload: number }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; transactions: Transaction[] } }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_USER'; payload: User };

export interface State {
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  togglePaidStatus: (id: number) => void;
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  isAuthenticated: boolean;
  user: User | null;
  loginUser: (user: Omit<User, 'name' | 'id'>) => void;
  logoutUser: () => void;
  registerUser: (user: Omit<User, 'id'>) => void;
}
