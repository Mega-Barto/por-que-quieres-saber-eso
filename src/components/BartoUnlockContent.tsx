import React, { useState } from 'react';
import { BARTO_UNLOCK_CODE } from '../constants/categories';

interface BartoUnlockContentProps {
  onClose: () => void;
  onUnlock: () => void;
}

const CODE_LENGTH = BARTO_UNLOCK_CODE.length;
const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'] as const;

const BartoUnlockContent: React.FC<BartoUnlockContentProps> = ({ onClose, onUnlock }) => {
  const [entered, setEntered] = useState('');
  const [error, setError] = useState(false);

  const resetInput = () => {
    setEntered('');
    setError(false);
  };

  const handleUnlockSuccess = () => {
    onUnlock();
    onClose();
  };

  const submitCode = (code: string) => {
    if (code === BARTO_UNLOCK_CODE) {
      handleUnlockSuccess();
      return;
    }
    setError(true);
    setEntered('');
    window.setTimeout(() => setError(false), 500);
  };

  const handleDigit = (digit: string) => {
    if (entered.length >= CODE_LENGTH) return;

    const next = entered + digit;
    setEntered(next);
    setError(false);

    if (next.length === CODE_LENGTH) {
      window.setTimeout(() => submitCode(next), 120);
    }
  };

  const handleKeyPress = (key: (typeof KEYPAD_KEYS)[number]) => {
    if (key === 'clear') {
      resetInput();
      return;
    }
    if (key === 'back') {
      setEntered((prev) => prev.slice(0, -1));
      setError(false);
      return;
    }
    handleDigit(key);
  };

  return (
    <div className="barto-unlock-modal" role="document">
      <button
        className="close-button"
        onClick={onClose}
        aria-label="Cerrar"
        title="Cerrar (ESC)"
        type="button"
      >
        &times;
      </button>

      <div className="modal-header barto-unlock-header">
        <div className="modal-icon modal-icon--special" aria-hidden="true">
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 id="barto-unlock-title">Acceso</h2>
      </div>

      <div className="barto-unlock-body">
        <p className="barto-unlock-hint">Introduce el patrón numérico</p>

        <div
          className={`barto-code-display${error ? ' barto-code-display--error' : ''}`}
          aria-live="polite"
          aria-label={`${entered.length} de ${CODE_LENGTH} dígitos`}
        >
          {Array.from({ length: CODE_LENGTH }, (_, i) => (
            <span
              key={i}
              className={`barto-code-dot${i < entered.length ? ' barto-code-dot--filled' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>

        {error && (
          <p className="barto-unlock-error" role="alert">
            Patrón incorrecto
          </p>
        )}

        <div className="barto-keypad">
          {KEYPAD_KEYS.map((key) => {
            if (key === 'clear') {
              return (
                <button
                  key={key}
                  type="button"
                  className="barto-key barto-key--action"
                  onClick={() => handleKeyPress(key)}
                  aria-label="Borrar todo"
                >
                  C
                </button>
              );
            }
            if (key === 'back') {
              return (
                <button
                  key={key}
                  type="button"
                  className="barto-key barto-key--action"
                  onClick={() => handleKeyPress(key)}
                  aria-label="Borrar último dígito"
                >
                  ←
                </button>
              );
            }
            return (
              <button
                key={key}
                type="button"
                className="barto-key"
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BartoUnlockContent;
