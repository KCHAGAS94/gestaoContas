import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  duration: string;
  monthlyEffectivePrice: string;
  isRecommended?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  duration,
  monthlyEffectivePrice,
  isRecommended = false,
}) => {
  const cardClasses = `bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col ${
    isRecommended ? 'border-2 border-cyan-400' : 'border-2 border-gray-700'
  }`;

  return (
    <div className={cardClasses}>
      {isRecommended && (
        <span className="bg-cyan-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
          Mais Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-center">{title}</h3>
      <div className="my-6 text-center">
        <span className="text-3xl font-extrabold">{price}</span>
        <span className="text-gray-400 block">{duration}</span>
      </div>
      <p className="text-center text-cyan-400 font-semibold mb-6">{monthlyEffectivePrice}</p>
      
      <button className="w-full mt-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
        Assinar Agora
      </button>
    </div>
  );
};

export default PricingCard;
