import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import userSelectors from '../../redux/user/userSelectors';
import globalSelectors from '../../redux/global/globalSelectors';
import classes from './rightSideBar.module.scss';
import SmallLoader from '../shared/SmallLoader';

const initialState = {
  kcalLeft: 0,
  kcalConsumed: 0,
  dailyRate: 0,
  percentsOfDailyRate: 0,
};

const RightSideBar = () => {
  const [dailyNorm, setDailyNorm] = useState(initialState);
  const summaries = useSelector(userSelectors.getSummaries);
  const daySummary = useSelector(userSelectors.getDaySummary);
  const currentDay = useSelector(userSelectors.getCurrentDay);
  const dailyRate = useSelector(userSelectors.getCalories);
  const userDataDailyRate = useSelector(userSelectors.getUserDataDailyRate);
  const notAllowedProducts = useSelector(userSelectors.getnotAllowedProducts);
  const isLoading = useSelector(globalSelectors.getLoading);

  useEffect(() => {
    const dataToRender = () => {
      const date = currentDay ? currentDay : new Date().toJSON().slice(0, 10);

      if ((!dailyRate && !userDataDailyRate) || !daySummary.dailyRate) {
        setDailyNorm({ ...initialState, date });
        return;
      }
      if (summaries.length) {
        setDailyNorm(
          summaries.find((summary) => summary.date === (daySummary.date ? daySummary.date : date)) || {
            ...daySummary,
            date,
          },
        );
      } else {
        setDailyNorm({ ...daySummary, date });
      }
    };

    dataToRender();
  }, [currentDay, dailyRate, daySummary, summaries, userDataDailyRate]);



  return (
    <>
      <section className={classes.section__rightSideBar}>
        <div className={classes.conteiner__rightSideBar}>
          <div className={classes.rightSideBar}>
            <div className={classes.sideBar__BlocList}>
              <h2 className={classes.title}>Summary for {dailyNorm.date}</h2>
              {isLoading  ? (
                <SmallLoader />
              ) : (
                <div className={classes.rightSideBar__lists}>
                  <ul className={classes.sideBar__list}>
                    <li>Remaining</li>
                    <li>Consumed</li>
                    <li>Daily norm</li>
                    <li>n% of the norm</li>
                  </ul>
                  <ul className={classes.sideBar__list}>
                    <li>{dailyNorm.kcalLeft} kcal</li>
                    <li>{Math.round(dailyNorm.kcalConsumed)} kcal</li>
                    <li>{dailyNorm.dailyRate} kcal</li>
                    <li>{Math.round(dailyNorm.percentsOfDailyRate)} %</li>
                  </ul>
                </div>
              )}
            </div>

            <div className={classes.sideBar__BlocDescription}>
              <h2 className={classes.title}>Products that are not recommended</h2>
              <div className={`${classes.notAllowedProductsList} ${classes.scrollbar}`}>
                {notAllowedProducts?.map((product) => (
                  <span key={product}>{product}, </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RightSideBar;
