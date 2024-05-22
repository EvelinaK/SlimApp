import React, { Fragment } from "react";
// import PropTypes from 'prop-types';
import DailyCaloriesForm from "../../components/DailyCaloriesForm";
import Decoration from '../../components/Decoration';

//styles
// import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <Fragment>
      <Decoration/>
      <section className='container'>
        <DailyCaloriesForm />
      </section>
    </Fragment>
  );
};

HomePage.propTypes = {
  // bla: PropTypes.string,
};

HomePage.defaultProps = {
  // bla: 'test',
};

export default HomePage;
