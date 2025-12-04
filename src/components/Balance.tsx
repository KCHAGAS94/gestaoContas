import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Função para formatar como moeda BRL
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense =
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
  
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <section id="balance" className="mb-8">
      <h2 className="text-2xl font-semibold border-b-2 border-cyan-500 pb-2 mb-4">Resumo</h2>
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-green-400">Receitas</h3>
          <p className="text-2xl font-mono">{formatCurrency(income)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-red-400">Despesas</h3>
          <p className="text-2xl font-mono">{formatCurrency(expense)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-cyan-400">Saldo Total</h3>
          <p className="text-2xl font-mono">{formatCurrency(total)}</p>
        </div>
      </div>
    </section>
  );
};

export default Balance;
