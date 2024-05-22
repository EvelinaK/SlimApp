import React from 'react';
import { CSSTransition } from 'react-transition-group';
import css from './Notification.module.scss';

const Notification = ({error, message}) => {
  return (
    <CSSTransition
    in={error}
    appear={true}
    timeout={250}
    classNames={css}
    unmountOnExit
    >
      <div className={css.notification}>
      <p>{message}</p>
      </div>
    </CSSTransition>
  );
};
export default Notification;