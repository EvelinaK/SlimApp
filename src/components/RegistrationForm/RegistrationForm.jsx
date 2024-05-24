
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch,  } from 'react-redux';
import Button from '../shared/Button/Button';
import ops from '../../redux/auth/authOperations';
import css from './RegistrationForm.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Decoration from '../Decoration';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Incorrect field length')
    .max(50, 'Character limit exceeded')
    .required('Required field *'),
  email: Yup.string().min(2, 'Incorrect field length').max(50, 'Character limit exceeded').required('Required field *'),
  password: Yup.string().required('Required field *').min(8, 'Too short!'),
});

const RegistrationForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();


  const handleClick = () => {
    history.push('/login');
  };

  const handleSubmit = async (values) => {
    dispatch(ops.register(values, history));
  };

  return (
    <>
      <Decoration isLoginPage={true} />
      <section className="container">
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          onSubmit={handleSubmit}
          validationSchema={RegisterSchema}
        >
          {({ errors, touched }) => (
            <Form className={css.registrationForm}>
              <h1>REGISTER</h1>
              <div className={css.registrationInputs}>
                <label className={css.formLabel}>
                  <Field
                    className={`${css.inputField} ${errors.username && touched.username ? css.errorInput : ''}`}
                    type="text"
                    name="username"
                    placeholder="Name *"
                  />
                  <ErrorMessage className={css.validField} name="username" component="span" />
                </label>
                <label className={css.formLabel}>
                  <Field
                    className={`${css.inputField} ${errors.email && touched.email ? css.errorInput : ''}`}
                    type="email"
                    name="email"
                    placeholder="E-mail *"
                  />
                  <ErrorMessage className={css.validField} name="email" component="span" />
                </label>
                <label className={css.formLabel}>
                  <Field
                    className={`${css.inputField} ${errors.password && touched.password ? css.errorInput : ''}`}
                    type="password"
                    name="password"
                    placeholder="Password *"
                  />
                  <ErrorMessage className={css.validField} name="password" component="span" />
                </label>
              </div>
              <div className={css.registrationButtons}>
                <Button clickHandler={handleClick}>LOGIN</Button>
                <Button type="submit" className="secondary-button">
                  REGISTER
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default RegistrationForm;