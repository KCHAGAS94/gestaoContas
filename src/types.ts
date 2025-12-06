// src/types.ts

export interface Transaction {
  id: number;
  text: string;
  amount: number;
  date: string;
  paid: boolean;
}

// Updated User interface to be compatible with Firebase Auth user object
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
}

// Argument types for auth functions
export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
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
  | { type: 'SET_LOADING'; payload: boolean }; // Added for async operations

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
  loading: boolean; // Added for UI feedback
  loginUser: (credentials: LoginCredentials) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (credentials: RegisterCredentials) => Promise<void>;
}
