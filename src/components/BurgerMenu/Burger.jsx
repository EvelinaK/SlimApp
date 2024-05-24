/* eslint-disable react/prop-types */
import React from 'react';
import styles from './BurgerMenu.module.scss';

export const Burger = ({ onClick }) => {
  return (
    <svg onClick={onClick} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={styles.burgerSvg}>
      <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" />
    </svg>
  );
};
