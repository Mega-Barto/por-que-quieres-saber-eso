import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';

interface Question {
  category: string;
  question: string;
}

interface RandomQuestionProps {
  cards: Question[];
}

const RandomQuestion: React.FC<RandomQuestionProps> = ({ cards }) => {
  const [randomCard, setRandomCard] = useState<Question | null>(null);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setRandomCard(cards[randomIndex]);
  };

  // Selecciona una pregunta aleatoria al cargar el componente
  useEffect(() => {
    getRandomQuestion();
  }, []);

  if (!randomCard) return null;

  return (
    <div className="random-question-container">
      <h2 className="random-title">Pregunta Aleatoria</h2>
      <div className="random-card-wrapper">
        <div className="category-badge">{randomCard.category}</div>
        <div className="random-card">
          <QuestionCard question={randomCard.question} alwaysShow={true} />
        </div>
      </div>
      <button className="refresh-button" onClick={getRandomQuestion}>
        Nueva Pregunta
      </button>
    </div>
  );
};

export default RandomQuestion; 