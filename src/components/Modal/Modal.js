/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import { NavLink } from 'react-router-dom';
import userSelectors from '../../redux/user/userSelectors';
import IconClose from '../shared/IconClose/IconClose';
import IconBack from '../shared/IconBack/IconBack';
import { CSSTransition } from 'react-transition-group';

function Modal({ toggleModal, showModal }) {
  Modal.propTypes = {
    modal: PropTypes.func,
  };

  const calories = useSelector(userSelectors.getCalories);
  const products = useSelector(userSelectors.getProducts);

  const modal = (e) => {
    if (e.code === 'Escape' || e.target.id === 'overlay') {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', modal);
    window.addEventListener('click', modal);
    return () => {
      window.removeEventListener('keydown', modal);
      window.removeEventListener('click', modal);
    };
    // eslint-disable-next-line
  }, [toggleModal, showModal]);

  return (
    <div id="overlay" className={styles.overlay}>
      <CSSTransition in={showModal} appear timeout={250} classNames={styles} unmountOnExit>
        <div className={styles.modal}>
          <button type="button" className={styles.closeModalMobileBtn} onClick={toggleModal}>
            <IconBack />
          </button>
          <button type="button" className={styles.closeModalBtn} onClick={toggleModal}>
            <IconClose />
          </button>
          <div className={styles.wrapper}>
            <p className={styles.title}>Your recommended daily caloric intake is:</p>
            <div className={styles.container}>
              <p className={styles.caloriesText}>
                <span className={styles.caloriesValue}>{calories}</span>
                kcal
              </p>
              <p className={styles.productsTitle}>Products you are advised not to consume</p>
              <ol className={`${styles.productsList} ${styles.scrollbar}`}>
                {products &&
                  products.map((product, id) => (
                    <li key={id} className={styles.productsItem}>
                      {product}
                    </li>
                  ))}
              </ol>
              <Button className={`primary-button ${styles.modalButton}`}>
                <NavLink to="/register" className={styles.buttonLink}>
                  Start losing weight
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Modal;
