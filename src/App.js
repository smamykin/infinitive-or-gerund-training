import QuestionBlock from "./components/card/QuestionBlock";
import {NEXT_QUESTION_TIMEOUT, WORDS} from "./components/card/constants";
import './App.css';

function App() {
  return (
    <QuestionBlock words={WORDS} nextQuestionTimeout={NEXT_QUESTION_TIMEOUT}/>
  );
}

export default App;
