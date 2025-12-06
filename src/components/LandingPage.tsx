import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Header } from './Header';
import Balance from './Balance';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import MonthSelector from './MonthSelector';

const LandingPage: React.FC = () => {
  const { logoutUser } = useContext(GlobalContext);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-8">
      <Header />
      <div className="container mx-auto max-w-lg">
        <MonthSelector />
        <Balance />
        <TransactionList />
        <AddTransaction />
      </div>
    </div>
  );
};

export default LandingPage;