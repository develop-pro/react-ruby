import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { Router } from 'react-router-dom';
import history from './history';
import './index.css';

render(
  <Router history={history}>
    <App/>
  </Router>,
  document.getElementById('root')
);
