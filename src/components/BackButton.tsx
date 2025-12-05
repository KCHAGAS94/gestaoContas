import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleGoBack}
      className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg
                 transition duration-300 ease-in-out transform hover:scale-105
                 flex items-center justify-center space-x-2 shadow-lg"
    >
      {/* You can add an icon here if desired, e.g., an SVG arrow */}
      <span>&larr;</span> {/* Left arrow character */}
      <span>Voltar</span>
    </button>
  );
};

export default BackButton;
