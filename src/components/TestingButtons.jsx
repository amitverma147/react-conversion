import React from 'react';

const TestingButtons = () => {
  return (
    <div className="testing-buttons">
      <button className="u-l-btn" onClick={() => document.body.classList.toggle('ul-active')}>U/L</button>
      <button className="a-b-btn" onClick={() => document.body.classList.toggle('ab-active')}>A/B</button>
    </div>
  );
};

export default TestingButtons;
