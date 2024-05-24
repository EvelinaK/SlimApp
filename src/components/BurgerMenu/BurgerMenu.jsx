import React from 'react';
import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';

export const BurgerMenu = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onClick } = props;
  return (
    <div className={styles.burgerMenu}>
      <ul className={styles.burgerMenuList}>
        <li>
          <NavLink exact to="/diary" className={styles.burgerMenuItemDiary} onClick={onClick}>
            DIARY
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/calculator" className={styles.burgerMenuItemCalc} onClick={onClick}>
            CALCULATOR
          </NavLink>
        </li>
      </ul>
    </div>
  );
};


