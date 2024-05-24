import React from 'react';
import style from './navigationbar.module.scss';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <>
      <nav className={style.container}>
        <ul className={style.navContainer}>
          <li>
            <NavLink activeClassName={style.active} exact to="/login" className={style.login}>
              <span>LOGIN</span>
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName={style.active} exact to="/register">
              <span>REGISTER</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
