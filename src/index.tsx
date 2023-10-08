import React from 'react';
import ReactDOM from 'react-dom/client';
import {filmsMocks} from 'src/mocks/films';
import {playerMocks} from 'src/mocks/player';
import {App} from './app/app.tsx';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      films={filmsMocks}
      player={playerMocks}
    />
  </React.StrictMode>
);
