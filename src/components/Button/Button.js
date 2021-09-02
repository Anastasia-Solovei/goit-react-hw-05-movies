import React from 'react';
import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.Button}>
      Go back
    </button>
  );
};

export default Button;
