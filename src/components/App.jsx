import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import axios from "axios";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";

const initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        status: 'loading'
      }
    case 'error':
      return {
        ...state,
        status: 'error'
      }
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
    default:
      return console.log("Unknown action");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  useEffect(() => {
    axios
      .get("http://localhost:9000/questions")
      .then((res) => dispatch({ type: "dataReceived", payload: res.data }))
      .catch((err) => dispatch({type: 'error'}));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === 'error' && <Error/>}
        {status === 'loading' && <Loader/>}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <p>Hello</p>
          </>
        )}
      </MainContent>
    </div>
  );
}
