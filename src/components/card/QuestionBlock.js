import React, {useState} from "react";
import {BARE_INFINITIVE, GERUND, INFINITIVE, NO_MATTER} from "./constants";
import classNames from 'classnames/bind';

const QuestionBlock = ({words: allQuestions, nextQuestionTimeout}) => {
  const [chosen, setChosen] = useState('');
  const [questions, setQuestions] = useState(Array.from(allQuestions.keys()));

  const currentWord = questions[0];
  const currentWordAnswer = allQuestions.get(currentWord);

  const onClick = (optionName) => {
    setChosen(optionName);
    let isError = currentWordAnswer !== optionName;
    setTimeout(() => {
      setChosen('');
      let currentWord = questions.shift();
      let newState = [...questions]
      if (isError) {
        newState.push(currentWord);
      }
      setQuestions(newState);
    }, nextQuestionTimeout * (isError ? 4 : 1));
  };

  return (questions.length === 0
      ? 'no words'
      : (
        <div>
          <div> {currentWord} ({questions.length}) </div>
          <AnswerOptions chosen={chosen} currentWordAnswer={currentWordAnswer} onClick={onClick}/>
        </div>
      )
  )
}

const AnswerOptions = ({chosen, currentWordAnswer, onClick}) => {
  return (
    <>
      {[INFINITIVE, GERUND, BARE_INFINITIVE, NO_MATTER].map(answerType => {
        return <AnswerOption
          key={answerType}
          isHighlight={chosen === answerType || (chosen !== '' && answerType === currentWordAnswer)}
          isWrongOption={answerType !== currentWordAnswer}
          title={answerType}
          onClick={() => onClick(answerType)}/>
      })}
    </>
  );
}

const AnswerOption = ({isHighlight, isWrongOption, onClick, title}) => {
  return (
    <div className={classNames({highlighted: isHighlight, error: isWrongOption}, 'answer-option')} onClick={onClick}>
      {title}
    </div>
  );


}

export default QuestionBlock;