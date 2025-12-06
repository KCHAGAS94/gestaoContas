import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const MonthSelector = () => {
  const { currentMonth, currentYear, setCurrentMonth, setCurrentYear } = useContext(GlobalContext);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(Number(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(Number(e.target.value));
  };

  // Gerar anos: 5 anos para trás e 5 anos para frente a partir do ano atual
  const currentFullYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentFullYear - 5 + i);

  return (
    <div className="flex justify-center space-x-4 mb-6">
      <select
        value={currentMonth}
        onChange={handleMonthChange}
        className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        {months.map((month, index) => (
          <option key={index} value={index} className="bg-gray-700 text-white">
            {month}
          </option>
        ))}
      </select>
      <select
        value={currentYear}
        onChange={handleYearChange}
        className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        {years.map((year) => (
          <option key={year} value={year} className="bg-gray-700 text-white">
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
