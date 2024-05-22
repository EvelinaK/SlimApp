import React, { Component } from 'react';
import css from './DiaryAddProductForm.module.scss';
import './DiaryAddProductFormAnimation.scss';
import Button from '../shared/Button/Button';
import back from '../../img/back-arrow.svg';
import api from '../../services/backend.service';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { addProduct } from '../../redux/user/userOperations';
import globalSelectors from '../../redux/global/globalSelectors';

const AddProdSchema = Yup.object().shape({
  product: Yup.string().required('Обязательное поле *'),
  weight: Yup.number().required('Обязательное поле *'),
});

class DiaryAddProductForm extends Component {
  state = {
    renderMarker: false,
    products: [],
    choosenProductId: '',
    error: null,
    showUl: false,
  };

  handleClick = () => {
    this.setState(prevState => {
      return { renderMarker: !prevState.renderMarker };
    });
  };

  debouncedSearch = debounce(query => {
    if (query === '') {
      return;
    }
    this.setState({ choosenProductId: '' });
    api
      .searchProduct(query)
      .then(({ data }) => {
        this.setState({ products: data });
        if (data.length === 1) {
          this.setState({ choosenProductId: data[0]._id });
        }
      })
      .catch(err => {
        err.response.data
          ? this.setState({ products: [], error: err.response.data.message })
          : this.setState({ products: [], error: err.message });
      });
  }, 400);

  hanleChange = ({ target }) => {
    this.setState({ showUl: true });
    this.debouncedSearch(target.value);
    this.setState({ error: null });
  };

  handleSubmit = ({ weight }) => {
    const product = {
      date: this.props.date,
      productId: this.state.choosenProductId,
      weight: weight,
    };
    this.props.addProduct(product);
  };

  render() {
    // console.log(css.errorMes);
    // const adderrorInput = css.errorMes ? css.errorInput : '';

    const { products } = this.state;
    const form = (
      <Formik
        initialValues={{
          weight: '100',
          product: '',
        }}
        onSubmit={(values, { resetForm }) => {
          this.handleSubmit(values);
          resetForm();
        }}
        validationSchema={AddProdSchema}
      >
        {({ setFieldValue, handleChange, handleBlur, errors, touched }) => (
          <Form className={css.modalForm}>
            <label className={css.formLabel}>
              <Field
                className={`${css.DailyCaloriesFormInput} ${
                  errors.product && touched.product ? css.errorInput : ''
                }`}
                onBlur={e => {
                  handleBlur(e);
                  this.setState({ showUl: false });
                  setTimeout(() => {
                    this.setState({ products: [] });
                  }, 300);
                }}
                onChange={e => {
                  handleChange(e);
                  this.hanleChange(e);
                }}
                name="product"
                placeholder="Введите название продукта*"
                type="text"
                autoComplete="off"
              />

              {/* <ErrorMessage
                className={css.validField}
                name="product"
                component="span"
              /> */}
            </label>
            <div className={css.productListWrapper}>
              {!!products.length ? (
                // <CSSTransition in={this.state.showUl} unmountOnExit classNames="search-list" timeout={500}>
                <ul className={`${css.autocomplete}  ${css.scrollbar}`}>
                  {products.map(product => (
                    <li
                      key={product._id}
                      className={css.autocompleteItem}
                      onClick={() => {
                        setFieldValue('product', product.title.ru);
                        this.setState({
                          products: [],
                          choosenProductId: product._id,
                        });
                      }}
                    >
                      {product.title.ru}
                    </li>
                  ))}
                </ul>
              ) : (
                // </CSSTransition>
                this.state.error && (
                  <p className={css.errorMes}>{this.state.error}</p>
                )
              )}
            </div>
            <label className={css.formLabel}>
              <Field
                className={` ${css.gramms} ${css.DailyCaloriesFormInput} ${
                  errors.weight && touched.weight ? css.errorInput : ''
                }`}
                name="weight"
                placeholder="Граммы*"
                type="number"
              />
              {/* <ErrorMessage
                className={css.validField}
                name="weight"
                component="span"
              /> */}
            </label>
            {window.innerWidth < 650 ? (
              <Button
                type="submit"
                className={css.secondaryButton}
                disabled={this.props.isLoading}
              >
                Добавить
              </Button>
            ) : (
              <Button
                type="submit"
                className={css.plusButton}
                disabled={this.props.isLoading}
              >
                +
              </Button>
            )}
          </Form>
        )}
      </Formik>
    );

    if (this.props.mobile) {
      return (
        <>
          <div className={css.triggerButtonWrapper}>
            <button
              type="button"
              onClick={this.handleClick}
              className={css.triggerButton}
            >
              +
            </button>
          </div>
          {this.state.renderMarker ? (
            <div className={css.modal}>
              <div className={css.buttonWrapper}>
                <button
                  onClick={this.handleClick}
                  type="button"
                  className={css.closeModal}
                >
                  <img src={back} alt="back-arrow" />
                </button>
              </div>
              {form}
            </div>
          ) : null}
        </>
      );
    } else {
      return <>{form}</>;
    }
  }
}
const mapStateToProps = state => ({
  isLoading: globalSelectors.getLoading(state),
});
const mapDispatchToProps = {
  addProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiaryAddProductForm);
