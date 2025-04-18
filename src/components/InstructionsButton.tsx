import React, { useState } from 'react';
import '../App.css';

const InstructionsButton: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <>
      <button 
        className="instructions-button" 
        onClick={toggleInstructions} 
        aria-label="Mostrar instrucciones"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>

      {showInstructions && (
        <div className="instructions-overlay">
          <div className="instructions-modal">
            <button className="close-button" onClick={closeInstructions}>&times;</button>
            <h2>Instrucciones</h2>
            <div className="instructions-content">
              <ol>
                <li>Elige una categoría o usa la pregunta aleatoria</li>
                <li>Escoge una tarjeta para revelar la pregunta</li>
                <li>Tu preguntarás "¿Por que quieres saber eso?"</li>
                <li>Deberé convencerte de responderla</li>
                <li>Si te convenso, responderás la pregunta.</li>
                <li>Si no te convenso, seré yo quien responda.</li>
              </ol>
              <p>También puedes responder directamente, juas juas.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructionsButton; 