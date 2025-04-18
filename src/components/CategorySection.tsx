import React, { useState } from 'react';
import CardGrid from './CardGrid';

interface CategorySectionProps {
  category: string;
  questions: string[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, questions }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="category-section">
      <div className={`category-title ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
        <span>{category}</span>
        <span className="toggle-icon">{isExpanded ? '−' : '+'}</span>
      </div>
      <div className={`category-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <CardGrid questions={questions} />
      </div>
    </div>
  );
};

export default CategorySection; 