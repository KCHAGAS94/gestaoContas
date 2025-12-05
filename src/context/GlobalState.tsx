// src/context/GlobalState.tsx
import { createContext, useReducer, ReactNode, useEffect } from 'react';
import AppReducer from './AppReducer';
import { Transaction, State } from '../types';

// Função para obter a data de hoje formatada (YYYY-MM-DD)
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Obter transações do localStorage
const getTransactionsFromLocalStorage = (): Transaction[] => {
  const storedTransactions = localStorage.getItem('transactions');
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

// Estado inicial
const initialState: State = {
  transactions: getTransactionsFromLocalStorage().length > 0 ? getTransactionsFromLocalStorage() : [
    
  ],
  deleteTransaction: () => {},
  addTransaction: () => {},
  togglePaidStatus: () => {},
  currentMonth: new Date().getMonth(), // 0-indexed
  currentYear: new Date().getFullYear(),
  setCurrentMonth: () => {},
  setCurrentYear: () => {},
};

// Criar contexto
export const GlobalContext = createContext<State>(initialState);

// Componente Provedor
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Salvar transações no localStorage sempre que elas mudarem
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
