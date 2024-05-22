import React from 'react';
//import PropTypes from 'prop-types';
import styles from './AuthNavigations.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import userSelectors from '../../redux/user/userSelectors.js';

const AuthNavigations = ({dailyRate, userDataDailyRate}) => (
  <div className={styles.authnav}>
    <NavLink exact to="/diary"  className={styles.link} activeClassName={styles.active}>ДНЕВНИК</NavLink>
    <NavLink exact to="/calculator" className={styles.link} activeClassName={styles.active}>КАЛЬКУЛЯТОР</NavLink>
  </div>
);
const mapState = state => ({
  dailyRate: userSelectors.getCalories(state),
  userDataDailyRate: userSelectors.getUserDataDailyRate(state),
})

export default connect(mapState)(AuthNavigations);

//{!dailyRate || !userDataDailyRate && }