import Header from './components/Header';
import Balance from './components/Balance';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <Header />
        <main>
          <Balance />
          <TransactionList />
          <AddTransaction />
        </main>
      </div>
    </div>
  );
}

export default App;
