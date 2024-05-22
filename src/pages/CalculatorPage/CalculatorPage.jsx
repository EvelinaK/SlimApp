
import RightSideBar from '../../components/RightSideBar';
import DailyCaloriesForm from '../../components/DailyCaloriesForm';
import Decoration from '../../components/Decoration';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserOperations from '../../redux/user/userOperations';
import styles from './CalculatorPage.module.scss';
import userSelectors from '../../redux/user/userSelectors';

function CalculatorPage() {
  const dispatch = useDispatch();
  const day = useSelector(userSelectors.getCurrentDay);
  const dailyRate = useSelector(userSelectors.getCalories);
  const userDataDailyRate = useSelector(userSelectors.getUserDataDailyRate);
  const userId = useSelector(userSelectors.getUserId);



  useEffect(() => {
    if (dailyRate == null) {
      return
    } else{
    if (!dailyRate && !userDataDailyRate) {
      return;
    }
   if (!day) {
        const today = new Date().toJSON().slice(0, 10);
        dispatch(UserOperations.getProducts({ date: today }));
       
    } else {
       dispatch(UserOperations.getProducts({ date:day }));
    
    }
  }
  }, [dispatch]);

     return (
          <Fragment>
            <Decoration isCalculationPage={true} />
            <section className="container">
              <div className={styles.wrapper}>
                <DailyCaloriesForm noModal={true} />
                <RightSideBar />
              </div>
            </section>
          </Fragment>
        );
}

export default CalculatorPage;

