import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import axios from "axios";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import Options from "./Options";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };
    case "error":
      return {
        ...state,
        status: "error",
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
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
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: 'finished',
        highscore: state.highscore < state.points ? state.points: state.highscore
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'active',
        highscore: state.highscore
      }
    default:
      return console.log("Unknown action");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((res, qur) => res + qur.points, 0);

  useEffect(() => {
    axios
      .get("http://localhost:9000/questions")
      .then((res) => dispatch({ type: "dataReceived", payload: res.data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && <FinishedScreen points={points} dispatch={dispatch} maxPoints={maxPoints} highscore={highscore} />}
      </MainContent>
    </div>
  );
}
