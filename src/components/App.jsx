import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import axios from 'axios'

const initialState = {
  questions: [],
  status: 'loading'
}

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        state: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    default:
      return console.log('Unknown action')
  }
}




export default function App() {

const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    axios.get('http://localhost:9000/questions')
      .then(res => dispatch({type: 'dataReceived', payload: res.data}))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="app">
      <Header />
      <MainContent>
      </MainContent>
    </div>
  );
}
