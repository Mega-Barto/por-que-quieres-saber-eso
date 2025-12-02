import React, { useState, useEffect } from 'react';
import '../App.css';

// Componente Modal reutilizable
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="instructions-overlay" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};

// Componente de contenido del modal de instrucciones
const InstructionsContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="instructions-modal" role="document">
      <button 
        className="close-button" 
        onClick={onClose}
        aria-label="Cerrar instrucciones"
        title="Cerrar (ESC)"
      >
        &times;
      </button>
      
      <div className="modal-header">
        <div className="modal-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h2 id="modal-title">¿Cómo jugar?</h2>
      </div>
      
      <div className="instructions-content" id="modal-description">
        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">1</span>
          <p>Elige una categoría o usa la <strong>pregunta aleatoria</strong></p>
        </div>
        
        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">2</span>
          <p>Si escogiste una categoría, clic en una <strong>tarjeta</strong> para revelar la pregunta</p>
        </div>
        
        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">3</span>
          <p>Tú preguntarás: <em>"¿Por qué quieres saber eso?"</em></p>
        </div>
        
        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">4</span>
          <p>La otra persona debe <strong>convencerte</strong> de que responda</p>
        </div>
        
        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">5</span>
          <p>Si te convence, <strong>respondes la pregunta</strong></p>
        </div>
        
        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">6</span>
          <p>Si no te convence, <strong>será quien responda</strong></p>
        </div>
        
        <div className="fun-note">
          <span className="emoji" role="img" aria-label="cara pícara">😏</span>
          <p>También puedes responder directamente... ¡juas juas!</p>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const InstructionsButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button 
        className="instructions-button" 
        onClick={handleOpen} 
        aria-label="Mostrar instrucciones"
        title="Cómo jugar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>

      <Modal open={open} onClose={handleClose}>
        <InstructionsContent onClose={handleClose} />
      </Modal>
    </>
  );
};

export default InstructionsButton; 