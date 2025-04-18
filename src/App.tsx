import "./App.css";
import CategorySection from "./components/CategorySection";
import RandomQuestion from "./components/RandomQuestion";
import InstructionsButton from "./components/InstructionsButton";
import questionsData from "./data/questions.json";

// Definir el tipo para las preguntas
interface Question {
  category: string;
  question: string;
}

function App() {
  // Obtener las preguntas del archivo JSON
  const cards: Question[] = questionsData;

  // Agrupar las preguntas por categoría
  const groupedByCategory: { [key: string]: string[] } = {};
  cards.forEach((card) => {
    if (!groupedByCategory[card.category]) {
      groupedByCategory[card.category] = [];
    }
    groupedByCategory[card.category].push(card.question);
  });

  return (
    <div className="app-container">
      <h1 className="main-title">¿Por que quieres saber eso?</h1>
      
      {/* Sección de pregunta aleatoria */}
      <RandomQuestion cards={cards} />
      
      {/* Línea divisoria */}
      <div className="divider">
        <span>Todas las categorías</span>
      </div>

      {/* Secciones de categorías */}
      <div className="categories-container">
        {Object.entries(groupedByCategory).map(
          ([category, questions], categoryIndex) => (
            <CategorySection 
              key={categoryIndex} 
              category={category} 
              questions={questions} 
            />
          )
        )}
      </div>
      
      {/* Botón de instrucciones */}
      <InstructionsButton />
    </div>
  );
}

export default App;
