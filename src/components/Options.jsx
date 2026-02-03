function Options({ dispatch, question, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((opt, index) => (
        <button
          className={`btn btn-option 
            ${answer === index ? "answer" : ""}
            ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}
            `}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={opt}
          disabled={hasAnswered}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
