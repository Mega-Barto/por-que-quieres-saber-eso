import React, { useState } from 'react';
import CardGrid from './CardGrid';

interface CategorySectionProps {
  category: string;
  questions: string[];
  isSpecial?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  questions,
  isSpecial = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`category-section${isSpecial ? ' category-section--special' : ''}`}>
      <div
        className={`category-title${isSpecial ? ' category-title--special' : ''} ${isExpanded ? 'expanded' : ''}`}
        onClick={toggleExpand}
      >
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
