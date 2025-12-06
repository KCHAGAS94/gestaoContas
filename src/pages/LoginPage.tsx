import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FirebaseError } from 'firebase/app';

// Helper para traduzir erros comuns do Firebase
const getFirebaseErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'O formato do e-mail é inválido.';
    case 'auth/user-not-found':
      return 'Nenhum usuário encontrado com este e-mail.';
    case 'auth/wrong-password':
      return 'Senha incorreta.';
    case 'auth/email-already-in-use':
      return 'Este e-mail já está em uso por outra conta.';
    case 'auth/weak-password':
      return 'A senha é muito fraca. Use pelo menos 6 caracteres.';
    case 'auth/operation-not-allowed':
      return 'Operação não permitida. Contate o suporte.';
    default:
      return 'Ocorreu um erro. Tente novamente.';
  }
};


const LoginPage: React.FC = () => {
  const { registerUser, loginUser, loading } = useContext(GlobalContext);

  const [isLoginView, setIsLoginView] = useState(true);
  
  // State for registration form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Shared error state
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError(''); // Clear previous errors
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      await registerUser({ name, email, password });
      // A transição de estado será gerenciada pelo onAuthStateChanged no GlobalState
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(err));
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await loginUser({ email: loginEmail, password: loginPassword });
      // A transição de estado será gerenciada pelo onAuthStateChanged no GlobalState
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(err));
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-12 text-center">
        Gestão de Contas
      </h1>
      <p className="text-lg text-white text-center mb-8 max-w-md">
        Assuma o controle. Gerencie sua conta agora e simplifique seu acesso.
      </p>
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col border-2 border-cyan-400">
        {isLoginView ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              autoCapitalize="none"
            />
            <input
              type="password"
              placeholder="Senha"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button type="submit" disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Aguarde...' : 'Logar'}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => { setIsLoginView(false); setError(''); }}
                className="text-cyan-400 hover:text-cyan-500"
              >
                Criar Cadastro
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Criar Cadastro</h2>
            {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              autoCapitalize="none"
            />
            <input
              type="password"
              placeholder="Senha (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Aguarde...' : 'Criar Conta'}
            </button>
            <div className="text-center mt-4">
              <button
                onClick={() => { setIsLoginView(true); setError(''); }}
                className="text-cyan-400 hover:text-cyan-500"
              >
                Já tenho uma conta (Login)
              </button>
            </div>
          </>
        )}
      </div>
      
      <footer className="text-gray-500 mt-12">
        todos direitos reservados gestão de contas
      </footer>
    </div>
  );
};

export default LoginPage;
