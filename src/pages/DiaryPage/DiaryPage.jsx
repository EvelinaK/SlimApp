/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DiaryProductsList from '../../components/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import SetDate from '../../components/SetDate/SetDate';
import Decoration from '../../components/Decoration';
import { getProducts } from '../../redux/user/userOperations';
import userActions from '../../redux/user/userActions';
import userSelectors from '../../redux/user/userSelectors';
import css from './DiaryPage.module.scss';

const DiaryPage = ({ currentDate, dailyRate, userDataDailyRate, getProducts, setCurrentDay }) => {
  const [date, setDate] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  useEffect(() => {
    if (currentDate) {
      setDate(currentDate);
    } else {
      const today = getCurrentDate();
      setDate(today);
    }
  }, [currentDate]);

  useEffect(() => {
    if(date) getProducts({ date });
   
  }, [date, getProducts]);



  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    dd.length === 1 ? (dd = `0${dd}`) : (dd = `${dd}`);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const changeDate = (value) => {
    setDate(String(value));
    setCurrentDay(value);
  };

  return (
<>
      {dailyRate || userDataDailyRate !== 0 ? (
        screenWidth < 650 ? (
          <Fragment>
            <Decoration isCalculationPage={true} />
            <section className="container">
              <div className={css.pageWrapper}>
                <div className={css.diarypageWrapper}>
                  <SetDate value={changeDate} currentDate={date} />
                  <DiaryProductsList />
                  <DiaryAddProductForm date={date} mobile={true} />
                </div>
                <RightSideBar />
              </div>
            </section>
          </Fragment>
        ) : (
          <Fragment>
            <Decoration isCalculationPage={true} />
            <section className="container">
              <div className={css.pageWrapper}>
                <div className={css.diarypageWrapper}>
                  <SetDate value={changeDate} />
                  <DiaryAddProductForm date={date} mobile={false} />
                  <DiaryProductsList />
                </div>
                <RightSideBar />
              </div>
            </section>
          </Fragment>
        )
      ) : (
        <Redirect to="/calculator" />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentDate: userSelectors.getCurrentDay(state),
  dailyRate: userSelectors.getCalories(state),
  userDataDailyRate: userSelectors.getUserDataDailyRate(state),
});

export default connect(mapStateToProps, {
  getProducts,
  setCurrentDay: userActions.setCurrentDay,
})(DiaryPage);