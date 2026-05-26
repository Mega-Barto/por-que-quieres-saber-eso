import { useState } from "react";
import "./App.css";
import CategorySection from "./components/CategorySection";
import RandomQuestion from "./components/RandomQuestion";
import InstructionsButton from "./components/InstructionsButton";
import questionsData from "./data/questions.json";
import {
  BARTO_SELECTION_CATEGORY,
  isExcludedFromRandom,
  persistBartoUnlocked,
  readBartoUnlockedFromStorage,
} from "./constants/categories";

interface Question {
  category: string;
  question: string;
}

function App() {
  const [bartoUnlocked, setBartoUnlocked] = useState(readBartoUnlockedFromStorage);

  const cards: Question[] = questionsData;

  const cardsForRandom = cards.filter(
    (card) => !isExcludedFromRandom(card.category)
  );

  const groupedByCategory: { [key: string]: string[] } = {};
  cards.forEach((card) => {
    if (!groupedByCategory[card.category]) {
      groupedByCategory[card.category] = [];
    }
    groupedByCategory[card.category].push(card.question);
  });

  const bartoQuestions = groupedByCategory[BARTO_SELECTION_CATEGORY] ?? [];
  const regularCategories = Object.entries(groupedByCategory).filter(
    ([category]) => category !== BARTO_SELECTION_CATEGORY
  );

  const handleBartoUnlock = () => {
    persistBartoUnlocked();
    setBartoUnlocked(true);
  };

  return (
    <>
      <div className="app-container">
        <h1 className="main-title">¿Por que quieres saber eso?</h1>

        <RandomQuestion cards={cardsForRandom} />

        {bartoUnlocked && bartoQuestions.length > 0 && (
          <>
            <div className="divider divider--special">
              <span>Barto&apos;s Selection</span>
            </div>
            <div className="barto-selection-container">
              <p className="barto-selection-intro">
                Preguntas curadas a mano — no salen en el sorteo aleatorio.
              </p>
              <CategorySection
                category={BARTO_SELECTION_CATEGORY}
                questions={bartoQuestions}
                isSpecial
              />
            </div>
          </>
        )}

        <div className="divider">
          <span>Todas las categorías</span>
        </div>

        <div className="categories-container">
          {regularCategories.map(([category, questions], categoryIndex) => (
            <CategorySection
              key={categoryIndex}
              category={category}
              questions={questions}
            />
          ))}
        </div>
      </div>

      <InstructionsButton
        bartoUnlocked={bartoUnlocked}
        onBartoUnlock={handleBartoUnlock}
      />
    </>
  );
}

export default App;
