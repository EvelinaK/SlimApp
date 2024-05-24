import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import notFound from './img/notFound.jpg';

const NotFound = (props) => (
  <div className="NotFoundWrapper">
    <br />
    <br />
    <br />
    <h1>
      {' '}
      Oh Snap!
      <br />
      Error Code : 404 not Found! <br />
      <br />
      <Link className="link" to="/">
        {' '}
        To home page
      </Link>
    </h1>
    <img src={notFound} alt="NotFound" aria-label="NotFound" className={styles.img} />
  </div>
);

export default NotFound;
