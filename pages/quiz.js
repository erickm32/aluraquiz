import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}
function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState(0);
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit(selectedAlternative);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                style={{ backgroundColor: alternativeIndex === selectedAlternative ? 'green' : 'inherit' }}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const router = useRouter();

  const { userName } = router.query;
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;

  const totalQuestions = db.questions.length;
  const [questionAndUserAnswers, setQuestionAndUserAnswers] = useState({
    questionIndex: 0, answer: null,
  });
  const [numberOfCorrects, setNumberOfCorrects] = useState(0);

  const question = db.questions[questionIndex];

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount
  }, []);

  const handleSubmitQuiz = (selectedAnswer) => {
    setQuestionAndUserAnswers({ questionIndex, answer: selectedAnswer });
    if (question.answer === selectedAnswer) {
      setNumberOfCorrects(numberOfCorrects + 1);
    }
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizContainer>
      <QuizLogo />
      {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          onSubmit={handleSubmitQuiz}
          questionIndex={0}
          totalQuestions={totalQuestions}
        />
      )}

      {screenState === screenStates.LOADING && <LoadingWidget />}

      {screenState === screenStates.RESULT && (
      <div>
        Você acertou
        {' '}
        {numberOfCorrects}
        {' '}
        questões, parabéns!
      </div>
      )}

    </QuizContainer>
  );
}

QuestionWidget.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  question: PropTypes.arrayOf(
    {
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      answer: PropTypes.number.isRequired,
      alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
    },
  ).isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};
