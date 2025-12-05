// src/context/GlobalState.tsx
import { createContext, useReducer, ReactNode, useEffect } from 'react';
import AppReducer from './AppReducer';
import { Transaction, State, User } from '../types';

// Obter transações do localStorage para um usuário específico
const getTransactionsFromLocalStorage = (userId: number): Transaction[] => {
  const storedTransactions = localStorage.getItem(`transactions_${userId}`);
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

// Obter usuário logado do localStorage
const getLoggedInUserFromLocalStorage = (): User | null => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
}

// Estado inicial
const initialState: State = {
  transactions: [],
  deleteTransaction: () => {},
  addTransaction: () => {},
  togglePaidStatus: () => {},
  currentMonth: new Date().getMonth(), // 0-indexed
  currentYear: new Date().getFullYear(),
  setCurrentMonth: () => {},
  setCurrentYear: () => {},
  isAuthenticated: false,
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {},
};

// Criar contexto
export const GlobalContext = createContext<State>(initialState);

// Componente Provedor
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const loggedInUser = getLoggedInUserFromLocalStorage();
    if (loggedInUser) {
      const transactions = getTransactionsFromLocalStorage(loggedInUser.id);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: loggedInUser, transactions } });
    }
  }, []);

  // Salvar transações no localStorage sempre que elas mudarem
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem(`transactions_${state.user.id}`, JSON.stringify(state.transactions));
    }
  }, [state.transactions, state.isAuthenticated, state.user]);

  // Ações
  function deleteTransaction(id: number) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  }

  function addTransaction(transaction: Transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  }

  function togglePaidStatus(id: number) {
    dispatch({
      type: 'TOGGLE_PAID_STATUS',
      payload: id,
    });
  }

  function setCurrentMonth(month: number) {
    dispatch({
      type: 'SET_CURRENT_MONTH',
      payload: month,
    });
  }

  function setCurrentYear(year: number) {
    dispatch({
      type: 'SET_CURRENT_YEAR',
      payload: year,
    });
  }

  function registerUser(user: Omit<User, 'id'>) {
    const users: User[] = JSON.parse(localStorage.getItem('cadastro.db') || '[]');
    const userExists = users.some(u => u.email === user.email);

    if (userExists) {
      alert('Usuário com este email já cadastrado!');
    } else {
      const newUser = { ...user, id: Date.now() };
      users.push(newUser);
      localStorage.setItem('cadastro.db', JSON.stringify(users));
      alert('Cadastro realizado com sucesso!');
      loginUser({ email: newUser.email, password: newUser.password });
    }
  }

    function loginUser(credentials: Omit<User, 'name' | 'id'>) {
        const users: User[] = JSON.parse(localStorage.getItem('cadastro.db') || '[]');
        const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (foundUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            const transactions = getTransactionsFromLocalStorage(foundUser.id);
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user: foundUser, transactions } });
        } else {
            alert('Email ou senha inválidos.');
        }
    }

    function logoutUser() {
        localStorage.removeItem('loggedInUser');
        dispatch({ type: 'LOGOUT' });
    }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        togglePaidStatus,
        currentMonth: state.currentMonth,
        currentYear: state.currentYear,
        setCurrentMonth,
        setCurrentYear,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
