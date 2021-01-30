import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

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

export default function QuizPage() {
  const router = useRouter();

  const { userName } = router.query;
  const question = db.questions[0];
  const questionIndex = 0;
  const [questionAndUserAnswers, setQuestionAndUserAnswers] = useState({
    questionIndex: 0, answer: null,
  });

  return (
    <QuizContainer>
      <QuizLogo />
      <QuestionWidget
        question={question}
        onSubmit={(selectedAnswer) => {
          setQuestionAndUserAnswers({ questionIndex, answer: selectedAnswer });
          // if (question.answer === selectedAnswer) {
          //   console.log('acerto mizeravi');
          // }
        }}
        questionIndex={0}
        totalQuestions={db.questions.length}
      />

      <Widget>
        <Widget.Content>
          <h1>Input da Galera</h1>

          <p>lorem ipsum dolor sit amet...</p>
          <p>
            Batata
            {' '}
            {userName}
          </p>
        </Widget.Content>
      </Widget>
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
