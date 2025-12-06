import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const getTodayDate = () => new Date().toISOString().split('T')[0];

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(getTodayDate());

  const { addTransaction, setCurrentMonth, setCurrentYear } = useContext(GlobalContext);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() === '' || amount === 0) {
      alert('Por favor, preencha a descrição e o valor.');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date,
      paid: false, // Novas transações são 'não pagas' por padrão
    };

    addTransaction(newTransaction);

    // Atualizar o mês e o ano atual para o da nova transação
    const newTransactionDate = new Date(date);
    setCurrentMonth(newTransactionDate.getMonth());
    setCurrentYear(newTransactionDate.getFullYear());

    // Limpar campos
    setText('');
    setAmount(0);
    setDate(getTodayDate());
  };

  return (
    <section id="add-transaction">
      <h2 className="text-2xl font-semibold border-b-2 border-cyan-500 pb-2 mb-4 text-white">Adicionar Nova Transação</h2>
      <form onSubmit={onSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label htmlFor="text" className="block mb-2 font-semibold text-white">Descrição</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: Salário, Aluguel..."
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-cyan-500 text-white"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="amount" className="block mb-2 font-semibold text-white">Valor</label>
          <input
            type="number"
            value={amount === 0 ? '' : amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Ex: 500, -250..."
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-cyan-500 text-white"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="date" className="block mb-2 font-semibold text-white">Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-cyan-500 text-white"
          />
        </div>
        <div className="md:col-span-3">
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            Adicionar Transação
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTransaction;
