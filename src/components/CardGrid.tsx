import React from 'react';
import QuestionCard from './QuestionCard';

interface CardGridProps {
  questions: string[];
}

const CardGrid: React.FC<CardGridProps> = ({ questions }) => {
  return (
    <div className="cards-grid">
      {questions.map((question, index) => (
        <QuestionCard key={index} question={question} />
      ))}
    </div>
  );
};

export default CardGrid; 