import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import TransactionItem from './TransactionItem';
import { Transaction } from '../types';

const TransactionList = () => {
  const { transactions, currentMonth, currentYear } = useContext(GlobalContext);

  // Filtrar transações pelo mês e ano atual
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  // Função de ordenação
  const sortedTransactions = [...filteredTransactions].sort((a: Transaction, b: Transaction) => {
    // Prioridade 1: "paid: false" (não pagas) vêm antes de "paid: true" (pagas)
    if (a.paid && !b.paid) {
      return 1; // a (paga) vai depois de b (não paga)
    }
    if (!a.paid && b.paid) {
      return -1; // a (não paga) vai antes de b (paga)
    }

    // Prioridade 2: Se o status de pago for o mesmo, ordene por data (mais antigas primeiro)
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  return (
    <section id="transactions" className="mb-8">
      <h2 className="text-2xl font-semibold border-b-2 border-cyan-500 pb-2 mb-4 text-white">Histórico</h2>
      {sortedTransactions.length > 0 ? (
        <ul id="transaction-list" className="space-y-3">
          {sortedTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-4">Nenhuma transação adicionada ainda para este mês.</p>
      )}
    </section>
  );
};

export default TransactionList;

