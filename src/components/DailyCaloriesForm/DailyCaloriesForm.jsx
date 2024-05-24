// import React, { Component } from 'react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as UserOperations from '../../redux/user/userOperations';
import userSelectors from '../../redux/user/userSelectors';
import Button from '../shared/Button';
import styles from './DailyCaloriesForm.module.scss';
import Modal from '../Modal';
import AuthSelectors from '../../redux/auth/authSelectors';
import globalSelectors from '../../redux/global/globalSelectors';
import SmallLoader from '../../components/shared/SmallLoader';


import leaf from '../../img/leaf.png'; 
import leaf2 from '../../img/leaf2.png'; 

const formSchema = Yup.object().shape({
  height: Yup.number().min(100, 'Enter a value from 100').max(250, 'Enter a value up to 250').required('Height*'),
  age: Yup.number().min(18, 'Enter a value from 18').max(99, 'Enter a value up to 100').required('Age*'),
  weight: Yup.number().min(20, 'Enter a value from 20').max(500, 'Enter a value up to 500').required('Current weight*'),
  desiredWeight: Yup.number()
    .min(20, 'Enter a value from 20')
    .max(500, 'Enter a value up to 500')
    .required('Desired weight*'),
});

function DailyCaloriesForm() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector(userSelectors.getUserId);
  const userInfo = useSelector(userSelectors.getUserInfo);
  const isLoading = useSelector(globalSelectors.getLoading);
  const isAuth = useSelector(AuthSelectors.getToken);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const getCalculations = (values) => {
    const userCharacteristics = {
      height: +values.height,
      weight: +values.weight,
      age: +values.age,
      desiredWeight: +values.desiredWeight,
      bloodType: +values.bloodType,
    };

    if (!userId) {
      dispatch(UserOperations.getDailyRate(userCharacteristics));

      toggleModal();
    } else {
      dispatch(UserOperations.getDailyRateWithId(userCharacteristics, userId));
    }
  };
  const { height, age, weight, desiredWeight, bloodType } = userInfo;

  return (
    <div className={styles.DailyCaloriesFormWrapper}>
      <div className={styles.cont}>
        <div className={styles.leaf}>
          <img className={styles.leaf2} src={leaf2} alt={'leaf2'} />
        </div>
        <div className={styles.leaf}>
          <img className={styles.leaf2} src={leaf} alt={'leaf'} />
        </div>
        <div className={styles.leaf}>
          <img className={styles.leaf2} src={leaf2} alt={'leaf2'} />
        </div>
        <div className={styles.leaf}>
          <img className={styles.leaf2} src={leaf} alt={'leaf'} />
        </div>
        <div className={styles.leaf}>
          <img className={styles.leaf} src={leaf} alt={'leaf2'} />
        </div>
      </div>

      <div className={`${styles.cont} ${styles.cont2}`}>
        <div className={styles.leaf}>
          <img className={styles.leaf2} src={leaf} alt={'leaf'} />
        </div>
        <div className={styles.leaf}>
          <img className={styles.leaf} src={leaf} alt={'leaf2'} />
        </div>
        <div className={styles.leaf}>
          <img className={styles.leaf} src={leaf} alt={'leaf2'} />
        </div>
        <div className={styles.leaf}>
          <img className={styles.leaf2} src={leaf} alt={'leaf'} />
        </div>
      </div>
      <h2 className={styles.DailyCaloriesFormTitle}>
        {isAuth ? 'Find out your daily calorie intake' : 'Calculate your daily calorie intake right now'}
      </h2>
      <Formik
        enableReinitialize
        initialValues={{
          height: height ? height : '',
          age: age ? age : '',
          weight: weight ? weight : '',
          desiredWeight: desiredWeight ? desiredWeight : '',
          bloodType: bloodType ? String(bloodType) : '1',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          getCalculations(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.DailyCaloriesForm}>
            <div className={styles.DailyCaloriesFormGeneralWrapper}>
              <div className={styles.DailyCaloriesFormFieldsContainer}>
                <div className={styles.DailyCaloriesFormFieldsWrapper}>
                  <ErrorMessage name="height" htmlFor="height" component="label" className={styles.errorMessage} />
                  <label htmlFor="height" className={styles.DailyCaloriesFormFieldsLabelText}>
                    Height *
                  </label>
                  <Field
                    id="height"
                    name="height"
                    type="number"
                    autoComplete="off"
                    className={`${styles.DailyCaloriesFormInput} ${
                      errors.height && touched.height ? styles.errorInput : ''
                    }`}
                  />
                </div>
                <div className={styles.DailyCaloriesFormFieldsWrapper}>
                  <ErrorMessage name="age" htmlFor="age" component="label" className={styles.errorMessage} />
                  <label htmlFor="age" className={styles.DailyCaloriesFormFieldsLabelText}>
                    Age *
                  </label>
                  <Field
                    id="age"
                    name="age"
                    type="number"
                    autoComplete="off"
                    className={`${styles.DailyCaloriesFormInput} ${errors.age && touched.age ? styles.errorInput : ''}`}
                  />
                </div>
                <div className={styles.DailyCaloriesFormFieldsWrapper}>
                  <ErrorMessage name="weight" component="label" htmlFor="weight" className={styles.errorMessage} />
                  <label htmlFor="weight" className={styles.DailyCaloriesFormFieldsLabelText}>
                    Current weight *
                  </label>
                  <Field
                    id="weight"
                    name="weight"
                    type="number"
                    autoComplete="off"
                    className={`${styles.DailyCaloriesFormInput} ${
                      errors.weight && touched.weight ? styles.errorInput : ''
                    }`}
                  />
                </div>
              </div>
              <div>
                <div className={styles.DailyCaloriesFormFieldsWrapper}>
                  <ErrorMessage
                    name="desiredWeight"
                    component="label"
                    htmlFor="desiredWeight"
                    className={styles.errorMessage}
                  />
                  <label htmlFor="desiredWeight" className={styles.DailyCaloriesFormFieldsLabelText}>
                    Desirable weight *
                  </label>
                  <Field
                    id="desiredWeight"
                    name="desiredWeight"
                    type="number"
                    autoComplete="off"
                    className={`${styles.DailyCaloriesFormInput} ${
                      errors.desiredWeight && touched.desiredWeight ? styles.errorInput : ''
                    }`}
                  />
                </div>
                <h3 className={styles.DailyCaloriesFormBloodTitle}>Blood group *</h3>
                <div className={styles.DailyCaloriesFormBloodWrapper}>
                  <div>
                    <Field id="I" type="radio" name="bloodType" value="1" className={styles.DailyCaloriesLabelField} />
                    <label htmlFor="I" className={styles.DailyCaloriesFormLabel}>
                      1
                    </label>
                  </div>
                  <div>
                    <Field id="II" type="radio" name="bloodType" value="2" className={styles.DailyCaloriesLabelField} />
                    <label htmlFor="II" className={styles.DailyCaloriesFormLabel}>
                      2
                    </label>
                  </div>
                  <div>
                    <Field
                      id="III"
                      type="radio"
                      name="bloodType"
                      value="3"
                      className={styles.DailyCaloriesLabelField}
                    />
                    <label htmlFor="III" className={styles.DailyCaloriesFormLabel}>
                      3
                    </label>
                  </div>
                  <div>
                    <Field id="IV" type="radio" name="bloodType" value="4" className={styles.DailyCaloriesLabelField} />
                    <label htmlFor="IV" className={styles.DailyCaloriesFormLabel}>
                      4
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" className={`primary-button ${styles.DailyCaloriesFormButton}`} disabled={isLoading}>
              Lose weight
            </Button>
            <div className={styles.SmallLoaderContainerHome}>{isLoading && <SmallLoader />}</div>
          </Form>
        )}
      </Formik>
      {showModal && !isLoading && <Modal toggleModal={toggleModal} showModal={showModal} />}
    </div>
  );
}
export default DailyCaloriesForm;
