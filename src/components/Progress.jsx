function Progress({index, numQuestions, maxPoints,answer, points}) {
  return (
    <header className="progress">
     <progress max={numQuestions} value={answer !== null ? index + 1 : index}></progress>
     <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
     <p><strong>{points}</strong> / {maxPoints}</p>
    </header>
  );
}

export default Progress;
