import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainContent from "./MainContent";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dateReceived":
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
      };
    case 'dataFailed':
      return {
        ...state,
        status: "error"
      }

    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dateReceived", payLoad: data }))
      .catch((err) => dispatch({type: 'dataFailed'}));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent>
        <p>1/15</p>
        <p>Question?</p>
      </MainContent>
    </div>
  );
}
