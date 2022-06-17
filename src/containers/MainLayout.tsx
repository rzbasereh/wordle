import React from 'react';
import Game from '../components/Game';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Game />
    </div>
  );
};

export default MainLayout;
