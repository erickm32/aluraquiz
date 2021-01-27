import React from 'react';
import { useRouter } from 'next/router';

export default function QuizPage() {
  const router = useRouter();

  const { userName } = router.query;

  return (
    <div>
      Batata
      {userName}
    </div>
  );
}
