import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Loader from "./Loader";

// 'loading', 'error', 'ready', 'active', 'finished'

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "receivedData":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "failedData":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload
      }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null

      }
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "receivedData", payload: data }))
      .catch((err) => dispatch({ type: "failedData" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Question question={questions[index]} answer={answer} dispatch={dispatch}/>
          </>
        )}
      </MainContent>
    </div>
  );
}
