import { useState, useEffect, useRef } from 'react';
import Flashcard from './Flashcard';

const Set = ({ terms, retry }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [assertions, setAssertions] = useState(0);
  const [flashcards, setFlaschards] = useState();
  const [failedAnswers, setFailedAnswers] = useState([]);

  const modalRef = useRef(null);

  useEffect(() => {
    setFlaschards(terms.toSorted(() => Math.random() - 0.5));
  }, []);

  const handleAssertion = (assert) => {
    if (assert) {
      setAssertions((a) => a + 1);
    } else {
      setFailedAnswers((f) => [flashcards[currentCard].term, ...f]);
    }
  };

  const nextCard = (prevAssert) => {
    handleAssertion(prevAssert);
    if (currentCard < terms.length - 1) {
      setCurrentCard((i) => i + 1);
    } else {
      setCurrentCard(0);
      modalRef.current.showModal();
    }
  };

  return (
    <>
      {flashcards && (
        <Flashcard
          data={flashcards[currentCard]}
          nextCard={nextCard}
          key={flashcards[currentCard].term}
        />
      )}
      <p>Aciertos: {assertions}</p>

      <dialog ref={modalRef}>
        <p>
          <b>Fin del set</b>
        </p>
        <p>
          Calificación: {assertions}/{terms.length}
        </p>
        {failedAnswers.length > 0 && (
          <>
            <p>Señas por repasar:</p>
            <ul>
              {failedAnswers.map((term) => {
                return <li key={term}>{term}</li>;
              })}
            </ul>
          </>
        )}
        <button
          onClick={() => {
            retry();
          }}
        >
          Reintentar
        </button>
      </dialog>
    </>
  );
};

export default Set;
