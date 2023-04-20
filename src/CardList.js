import React from 'react';
import Card from './Card';
import './CardList.css';

const CardList = ({ cards, onDeleteCard }) => {
  const modelPaths = [
    '/myModel1.stl',
    '/myModel2.stl',
    '/myModel3.stl',
    '/myModel1.stl',
    // Add more model paths as needed
  ];

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card
          key={index}
          content={card.content}
          onDelete={() => onDeleteCard(index)}
          modelPath={modelPaths[index % modelPaths.length]}
        />
      ))}
    </div>
  );
};

export default CardList;
