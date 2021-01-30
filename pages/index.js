import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';


export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  return (
    <QuizContainer>
      <QuizLogo />
      <Widget>
        <Widget.Header>
          <h1>{db.title}</h1>
        </Widget.Header>
        <Widget.Content>
          <p>{db.description}</p>
          <form onSubmit={(event) => { event.preventDefault(); router.push(`/quiz?userName=${userName}`); }}>
            <Input onChange={(event) => setUserName(event.target.value)} value={userName} name="userNameInput" placeholder="Digite seu nome!" />
            <Button type="submit" disabled={userName.length === 0}> Jogar </Button>
          </form>
        </Widget.Content>
      </Widget>

      <Widget>
        <Widget.Content>
          <h1>Quizes da Galera</h1>

          <p>lorem ipsum dolor sit amet...</p>
        </Widget.Content>
      </Widget>
      <Footer />
    </QuizContainer>
  );
}
