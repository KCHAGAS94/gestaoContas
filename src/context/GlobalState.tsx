// src/context/GlobalState.tsx
import { createContext, useReducer, ReactNode } from 'react';
import AppReducer from './AppReducer';
import { Transaction, State } from '../types';

// Função para obter a data de hoje formatada (YYYY-MM-DD)
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Estado inicial com dados de exemplo
const initialState: State = {
  transactions: [
    { id: 1, text: 'Salário', amount: 5000, date: '2025-12-05', paid: true },
    { id: 2, text: 'Aluguel', amount: -1500, date: '2025-12-10', paid: false },
    { id: 3, text: 'Conta de Luz', amount: -250, date: '2025-12-15', paid: false },
    { id: 4, text: 'Freelance', amount: 800, date: '2025-12-01', paid: true },
  ],
  deleteTransaction: () => {},
  addTransaction: () => {},
  togglePaidStatus: () => {},
};

// Criar contexto
export const GlobalContext = createContext<State>(initialState);

// Componente Provedor
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        togglePaidStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
