import React from 'react';
import ReactDOM from 'react-dom/client';
import "./main.css"
import App from './App';
import Container from './components/container';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Container>
      <App />
    </Container>
);

