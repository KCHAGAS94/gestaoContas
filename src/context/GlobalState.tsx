// src/context/GlobalState.tsx
import { createContext, useReducer, ReactNode, useEffect } from 'react';
import AppReducer from './AppReducer';
import { Transaction, State, User, RegisterCredentials, LoginCredentials } from '../types';
import { auth } from '../firebaseConfig';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';

// Obter transações do localStorage para um usuário específico (agora por UID string)
const getTransactionsFromLocalStorage = (userId: string): Transaction[] => {
  const storedTransactions = localStorage.getItem(`transactions_${userId}`);
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

// Estado inicial
const initialState: State = {
  transactions: [],
  deleteTransaction: () => {},
  addTransaction: () => {},
  togglePaidStatus: () => {},
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  setCurrentMonth: () => {},
  setCurrentYear: () => {},
  isAuthenticated: false,
  user: null,
  loading: true, // Começa como true para aguardar a verificação inicial de auth
  loginUser: async () => Promise.reject(),
  logoutUser: async () => Promise.reject(),
  registerUser: async () => Promise.reject(),
};

// Criar contexto
export const GlobalContext = createContext<State>(initialState);

// Componente Provedor
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Listener para o estado de autenticação do Firebase
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // Usuário está logado
        const currentUser: User = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
        const transactions = getTransactionsFromLocalStorage(currentUser.uid);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: currentUser, transactions } });
      } else {
        // Usuário está deslogado
        dispatch({ type: 'LOGOUT' });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    // Limpa o listener ao desmontar
    return () => unsubscribe();
  }, []);

  // Salvar transações no localStorage sempre que elas mudarem
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem(`transactions_${state.user.uid}`, JSON.stringify(state.transactions));
    }
  }, [state.transactions, state.isAuthenticated, state.user]);

  // Ações de transação (sem alteração)
  function deleteTransaction(id: number) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }

  function addTransaction(transaction: Transaction) {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  }

  function togglePaidStatus(id: number) {
    dispatch({ type: 'TOGGLE_PAID_STATUS', payload: id });
  }

  function setCurrentMonth(month: number) {
    dispatch({ type: 'SET_CURRENT_MONTH', payload: month });
  }

  function setCurrentYear(year: number) {
    dispatch({ type: 'SET_CURRENT_YEAR', payload: year });
  }

  // Ações de autenticação com Firebase
  async function registerUser({ name, email, password }: RegisterCredentials) {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Atualiza o perfil do usuário com o nome
      await updateProfile(user, { displayName: name });

      // O onAuthStateChanged vai ser acionado, mas o displayName pode não estar lá ainda.
      // Vamos despachar o login manualmente para garantir que a UI tenha o nome do usuário imediatamente.
      const currentUser: User = {
        uid: user.uid,
        displayName: name, // Usamos o nome que já temos
        email: user.email,
      };
      const transactions = getTransactionsFromLocalStorage(currentUser.uid);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: currentUser, transactions } });

    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  async function loginUser({ email, password }: LoginCredentials) {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O onAuthStateChanged vai lidar com o estado de login
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  async function logoutUser() {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await signOut(auth);
      // O onAuthStateChanged vai lidar com o estado de logout
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        deleteTransaction,
        addTransaction,
        togglePaidStatus,
        setCurrentMonth,
        setCurrentYear,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
