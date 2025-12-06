// src/components/TransactionItem.tsx
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from '../types';

// Função para formatar como moeda BRL
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
};

// Função para formatar data (DD/MM/YYYY)
const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { deleteTransaction, togglePaidStatus } = useContext(GlobalContext);
  
  const sign = transaction.amount < 0 ? '-' : '+';
  const amountColor = transaction.amount < 0 ? 'text-red-400' : 'text-green-400';
  const itemStyle = transaction.paid ? 'opacity-50' : 'opacity-100';

  return (
    <li className={`bg-gray-800 p-3 rounded-lg flex items-center shadow-md transition-all duration-300 ${itemStyle}`}>
      <input 
        type="checkbox"
        checked={transaction.paid}
        onChange={() => togglePaidStatus(transaction.id)}
        className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
      />
      <div className="flex-grow mx-4">
        <span className="font-semibold text-white">{transaction.text}</span>
        <span className="block text-sm text-gray-400">{formatDate(transaction.date)}</span>
      </div>
      <div className="text-right">
        <span className={`${amountColor} font-mono`}>
          {sign} {formatCurrency(Math.abs(transaction.amount))}
        </span>
      </div>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="ml-4 text-gray-500 hover:text-red-500 transition-colors duration-200"
        aria-label="Deletar Transação"
      >
        ❌
      </button>
    </li>
  );
};

export default TransactionItem;
