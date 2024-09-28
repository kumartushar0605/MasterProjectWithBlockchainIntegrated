import React, { useState } from 'react';
import CreditCards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'; // Import default styles
import './VirtualCard.css';

function VirtualCard({ number = '', expiry = '', cvc = '', highlightField = '', flipCard = false }) {
  const [flipped, setFlipped] = useState(flipCard);

  const handleCardFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="virtual-card" onClick={handleCardFlip}>
      <CreditCards
        number={number}
        expiry={expiry}
        cvc={cvc}
        focused={highlightField}
        placeholders={{ number: '**** **** **** ****', name: 'FULL NAME', expiry: 'MM/YY', cvc: 'CVV' }}
      />
      <div className={`card-flip ${flipped ? 'flipped' : ''}`}>
        {/* Additional details or animations for the back of the card */}
      </div>
    </div>
  );
}

export default VirtualCard;
