import React, { useState } from 'react';

interface QuestionCardProps {
  question: string;
  alwaysShow?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, alwaysShow = false }) => {
  const [isFlipped, setIsFlipped] = useState(alwaysShow);

  const handleClick = () => {
    if (!alwaysShow) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className={`question-card ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleClick}
    >
      <div className="question-content">
        {isFlipped ? (
          <p>{question}</p>
        ) : (
          <p className="tap-to-reveal">Toca para ver la pregunta</p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard; 