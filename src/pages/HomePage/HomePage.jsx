import React, { Fragment } from 'react';
import DailyCaloriesForm from '../../components/DailyCaloriesForm';
import Decoration from '../../components/Decoration';


const HomePage = () => {
  return (
    <Fragment>
      <Decoration />
      <section className="container">
        <DailyCaloriesForm />
      </section>
    </Fragment>
  );
};

export default HomePage;
