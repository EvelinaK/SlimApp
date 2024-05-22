import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
// import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
