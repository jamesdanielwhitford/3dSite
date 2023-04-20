import React, { useState } from 'react';
import CardList from './CardList';

const App = () => {
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    const newCard = { content: `Card ${cards.length + 1}` };
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>React Card App</h1>
      <button className="btn btn-primary" onClick={handleAddCard}>
        Add Card
      </button>
      <CardList cards={cards} onDeleteCard={handleDeleteCard} />
    </div>
  );
};

export default App;
