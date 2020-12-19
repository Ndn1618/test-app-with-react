import { useState, useEffect } from 'react'
import Questions from './Components/Data/Data'
import './App.css';

function App() {

  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const buttonOnChangeHandler = (evt) => {
    if (evt.target.attributes.iscorrect.value === 'true') {
      setScore(score + 1)
      evt.target.classList.add('correct')
    } else {
      evt.target.classList.add('incorrect')
    }

    for (let index = 1; index <= 3; index++) {
      evt.target.parentNode.children[index].disabled = true
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [
    showScore
  ])

  return (

    <div className='container'>
      {
        <>
          <h1 className='quiz-heading'>Test your knowledge</h1>
          <ul className='quiz-list'>
            {
              Questions.map((question, index) => {
                return <li className='quiz-item' key={index}>
                  <p>{index + 1}. {question.questionText}</p>
                  {
                    question.answerOptions.map((answerOption, id) => (
                      <button iscorrect={String(answerOption.isCorrect)} key={id} id='quiz-button' type='button' disabled={false} onClick={buttonOnChangeHandler}>{answerOption.option}. {answerOption.answerText}</button>
                    ))
                  }
                </li>
              })
            }
          </ul>
          {
            showScore && (
              <div className='score-section'>
                You scored {score} out of {Questions.length}
              </div>
            )
          }
        </>
      }
    </div>
  );
}

export default App;
