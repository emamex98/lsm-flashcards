import { useState, useRef, useEffect } from 'react';

import Video from './Video';

const Flashcard = ({ data, nextCard }) => {
  const { term, video } = data;

  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  const [assert, setAssert] = useState('');

  let keyDownHandler;

  const handleAnswer = (e) => {
    e.preventDefault();

    const answer = inputRef.current.value.toLowerCase().trim();
    answer === term ? setAssert(true) : setAssert(false);

    modalRef.current.showModal();
    closeRef.current.autofocus = true;
    document.removeEventListener('keydown', keyDownHandler);
  };

  useEffect(() => {
    keyDownHandler = (e) => {
      if (e.key === 'Enter' && inputRef.current.value) {
        handleAnswer(e);
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <>
      {/* <h1>Respuesta: {term}</h1> */}
      <Video source={video}></Video>
      <br />
      <form onSubmit={handleAnswer}>
        <p>Respuesta:</p>
        <input ref={inputRef} type='text' autoFocus />
        <br />
        <br />
        <button type='submit'>Enviar</button>
      </form>

      <dialog ref={modalRef}>
        {assert && (
          <p>
            <b>✅ ¡Respuesta correcta!</b>
          </p>
        )}
        {!assert && (
          <>
            <p>
              <b>❌ ¡Respuesta incorrecta!</b>
            </p>
            <p>
              La respuesta correcta es <b>{term}</b>.
            </p>
          </>
        )}
        <button
          ref={closeRef}
          onClick={() => {
            modalRef.current.close();
            nextCard(assert);
          }}
        >
          Cerrar
        </button>
      </dialog>
    </>
  );
};

export default Flashcard;
