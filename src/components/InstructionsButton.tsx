import React, { useState } from 'react';
import '../App.css';
import Modal from './Modal';
import BartoUnlockContent from './BartoUnlockContent';

interface InstructionsButtonProps {
  bartoUnlocked: boolean;
  onBartoUnlock: () => void;
}

const InstructionsContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="instructions-modal" role="document">
      <button
        className="close-button"
        onClick={onClose}
        aria-label="Cerrar instrucciones"
        title="Cerrar (ESC)"
        type="button"
      >
        &times;
      </button>

      <div className="modal-header">
        <div className="modal-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
        <h2 id="modal-title">¿Cómo jugar?</h2>
      </div>

      <div className="instructions-content" id="modal-description">
        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">
            1
          </span>
          <p>
            Elige una categoría o usa la <strong>pregunta aleatoria</strong>
          </p>
        </div>

        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">
            2
          </span>
          <p>
            Si escogiste una categoría, clic en una <strong>tarjeta</strong> para revelar la pregunta
          </p>
        </div>

        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">
            3
          </span>
          <p>
            Tú preguntarás: <em>&quot;¿Por qué quieres saber eso?&quot;</em>
          </p>
        </div>

        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">
            4
          </span>
          <p>
            La otra persona debe <strong>convencerte</strong> de que responda
          </p>
        </div>

        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">
            5
          </span>
          <p>
            Si te convence, <strong>respondes la pregunta</strong>
          </p>
        </div>

        <div className="instruction-step">
          <span className="step-number" aria-hidden="true">
            6
          </span>
          <p>
            Si no te convence, <strong>será quien responda</strong>
          </p>
        </div>

        <div className="fun-note">
          <span className="emoji" role="img" aria-label="cara pícara">
            😏
          </span>
          <p>También puedes responder directamente...</p>
        </div>
      </div>
    </div>
  );
};

const InstructionsButton: React.FC<InstructionsButtonProps> = ({
  bartoUnlocked,
  onBartoUnlock,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ariaLabel = bartoUnlocked ? 'Mostrar instrucciones' : 'Abrir acceso';
  const title = bartoUnlocked ? 'Cómo jugar' : 'Acceso';

  return (
    <>
      <button
        className="instructions-button"
        onClick={handleOpen}
        aria-label={ariaLabel}
        title={title}
        type="button"
      >
        <span className="instructions-button-emoji" aria-hidden="true">
          😏
        </span>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        ariaLabelledBy={bartoUnlocked ? 'modal-title' : 'barto-unlock-title'}
      >
        {bartoUnlocked ? (
          <InstructionsContent onClose={handleClose} />
        ) : (
          <BartoUnlockContent onClose={handleClose} onUnlock={onBartoUnlock} />
        )}
      </Modal>
    </>
  );
};

export default InstructionsButton;
