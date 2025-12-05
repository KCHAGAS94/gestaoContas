import React, { useState, useContext } from 'react';
import PricingCard from '../components/PricingCard';
import { GlobalContext } from '../context/GlobalState';

const LoginPage: React.FC = () => {
  const { registerUser, loginUser } = useContext(GlobalContext);

  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
    } else {
      setError('');
      registerUser({ name, email, password });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ email: loginEmail, password: loginPassword });
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
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value.toLowerCase())}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 lowercase"
            />
            <input
              type="password"
              placeholder="Senha"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value.toLowerCase())}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 lowercase"
            />
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
              Logar
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsLoginView(false)}
                className="text-cyan-400 hover:text-cyan-500"
              >
                Criar Cadastro
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Criar Cadastro</h2>
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
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 lowercase"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value.toLowerCase())}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 lowercase"
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.toLowerCase())}
              className="w-full bg-gray-700 text-white px-4 py-3 mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 lowercase"
            />
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            <button
              onClick={handleRegister}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
              Criar Conta
            </button>
            <div className="text-center mt-4">
              <button
                onClick={() => setIsLoginView(true)}
                className="text-cyan-400 hover:text-cyan-500"
              >
                Login
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
