import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const cardImage = [
  { src: "/image/helmet-1.png", matched: false },
  { src: "/image/potion-1.png", matched: false },
  { src: "/image/ring-1.png", matched: false },
  { src: "/image/scroll-1.png", matched: false },
  { src: "/image/shield-1.png", matched: false },
  { src: "/image/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setGameStart(true);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {gameStart ? (
        <p>You took {turns} turns to finished the game</p>
      ) : (
        <p>Click "New Game" to start the game</p>
      )}
    </div>
  );
}

export default App;

//git push https://github.com/laushiju/Memory-Game.git

//#68
