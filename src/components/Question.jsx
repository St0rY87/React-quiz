import Options from "./Options";
import NextButton from "./NextButton";

function Question({ question, answer, dispatch }) {
 
  return (
    <>
      <h4>{question.question}</h4>
      <Options dispatch={dispatch} answer={answer} question={question} />
    </>
  );
}

export default Question;
