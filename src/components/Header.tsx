import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Header = () => {
  const { logoutUser, user } = useContext(GlobalContext);

  return (
    <header className="w-full max-w-lg mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-center text-cyan-400">
        Gestão de Contas
      </h1>
      <div className="flex items-center">
        {user && <span className="text-white mr-4">Olá, {user.name}</span>}
        <button
          onClick={() => logoutUser && logoutUser()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          Sair
        </button>
      </div>
    </header>
  );
};
