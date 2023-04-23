import React, { useEffect, useState } from 'react';
import { Planadd } from '../Components/Planadd.jsx';
import { Plan } from '../Components/Plan.jsx';
import { Header } from '../Components/Header.jsx';

export const Journal = () => {
  const [slug, setslug] = useState();
  useEffect(() => {
    setslug(window.location.href.split('http://localhost:3000/')[1]);
  }, []);
  return (
    <div>
      <Header />
      {slug === 'journal' && <Plan />}
      {slug === 'journal/plan/add' && <Planadd />}
    </div>
  );
};
