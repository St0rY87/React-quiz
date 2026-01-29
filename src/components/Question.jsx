import Options from "./Options"
import NextButton from "./NextButton"

function Question({question, answer, dispatch, numQuestions, index}) {
    return (
        <div>
            <h4>{question.question}</h4>
                <Options question={question} answer={answer} dispatch={dispatch} />

            <NextButton answer={answer} numQuestions={numQuestions} dispatch={dispatch} index={index}/>
        </div>
    )
}

export default Question
