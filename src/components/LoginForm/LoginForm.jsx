/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { authOperations, authActions } from '../../redux/auth';
import globalSelectors from '../../redux/global/globalSelectors';
import Decoration from '../Decoration';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../shared/Button';
import css from './LoginForm.module.scss';

const SignupSchema = Yup.object().shape({
  email: Yup.string().min(2, 'Incorrect field length').max(50, 'Character limit exceeded').required('Required field *'),
  password: Yup.string().required('Required field *').min(8, 'Incorrect field length'),
});

const LoginForm = (props) => {
  const handleClick = () => {
    props.history.push('/register');
  };
  const handleSubmit = (values) => {
    props.login(values);
  };

  return (
    <>
      <Decoration isLoginPage={true} />
      <section className="container">
        <div className={css.loginPage}>
          <h2 className={css.loginTitle}>LOGIN</h2>

          <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit} validationSchema={SignupSchema}>
            {({ errors, touched }) => (
              <Form className={css.loginForm}>
                <label className={css.formLabel}>
                  <Field
                    className={`${css.login} ${errors.email && touched.email ? css.errorInput : ''}`}
                    type="email"
                    name="email"
                    placeholder="E-mail *"
                  />
                  <ErrorMessage className={css.validField} name="email" component="span" />
                </label>

                <label className={css.formLabel}>
                  <Field
                    className={`${css.password} ${errors.password && touched.password ? css.errorInput : ''}`}
                    type="password"
                    name="password"
                    placeholder="Password *"
                  />
                  <ErrorMessage className={css.validField} name="password" component="span" />
                </label>

                <div className={css.buttons}>
                  <Button type="submit"> LOGIN </Button>
                  <Button className="secondary-button" clickHandler={handleClick}>
                    REGISTER
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  error: globalSelectors.getError(state),
  test: state,
});
const mapDispatchToProps = {
  loginError: authActions.loginError,
  clearError: authActions.clearError,
  login: authOperations.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
