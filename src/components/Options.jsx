function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((opt, index) => (
        <button
          className={`btn btn-option 
            ${index === answer ? "answer" : ""}
            ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}
            `}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={crypto.randomUUID()}
          disabled={hasAnswered}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
