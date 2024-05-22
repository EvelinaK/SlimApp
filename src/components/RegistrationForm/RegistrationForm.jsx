import React, { Component } from 'react';
import Button from '../shared/Button/Button';
import ops from '../../redux/auth/authOperations';
import { connect } from 'react-redux';
import css from './RegistrationForm.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import  authActions  from '../../redux/auth';
import globalSelectors from '../../redux/global/globalSelectors';
import  authActions from '../../redux/auth/authActions'
import Decoration from '../Decoration';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Некорректная длинна поля')
    .max(50, 'Превышен лимит символов')
    .required('Обязательное поле *'),
  email: Yup.string()
    .min(2, 'Некорректная длинна поля')
    .max(50, 'Превышен лимит символов')
    .required('Обязательное поле *'),
  password: Yup.string().required('Обязательное поле *').min(8, 'Too short!'),
});

class RegistrationForm extends Component {
  handleClick = () => {
    this.props.history.push('/login');
  };

  handleSubmit = async values => {
    this.props.register(values, this.props.history);
  };

  render() {

    return (
      <>
        <Decoration isLoginPage={true} />
        <section className="container">
          <Formik
            initialValues={{ email: '', password: '', username: '' }}
            onSubmit={this.handleSubmit}
            validationSchema={RegisterSchema}
          >
            {({ errors, touched }) => (
              <Form className={css.registrationForm}>
                <h1>РЕГИСТРАЦИЯ</h1>
                <div className={css.registrationInputs}>
                  <label className={css.formLabel}>
                    <Field
                      className={`${css.inputField} ${
                        errors.username && touched.username
                          ? css.errorInput
                          : ''
                      }`}
                      type="text"
                      name="username"
                      placeholder="Имя *"
                    />
                    <ErrorMessage
                      className={css.validField}
                      name="username"
                      component="span"
                    />
                  </label>
                  <label className={css.formLabel}>
                    <Field
                      className={`${css.inputField} ${
                        errors.email && touched.email ? css.errorInput : ''
                      }`}
                      type="email"
                      name="email"
                      placeholder="E-mail *"
                    />
                    <ErrorMessage
                      className={css.validField}
                      name="email"
                      component="span"
                    />
                  </label>
                  <label className={css.formLabel}>
                    <Field
                      className={`${css.inputField} ${
                        errors.password && touched.password
                          ? css.errorInput
                          : ''
                      }`}
                      type="password"
                      name="password"
                      placeholder="Пароль *"
                    />
                    <ErrorMessage
                      className={css.validField}
                      name="password"
                      component="span"
                    />
                  </label>
                </div>
                <div className={css.registrationButtons}>
                  <Button clickHandler={this.handleClick}>Вход</Button>
                  <Button type="submit" className="secondary-button">
                    Регистрация
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </>
    );
  }
}

const mapDispatchToProps = {
  clearError: authActions.clearError,
  register: ops.register,
};

const mapStateToProps = state => ({
  error: globalSelectors.getError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
