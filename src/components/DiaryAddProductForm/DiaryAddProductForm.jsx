import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import debounce from 'lodash.debounce';
import css from './DiaryAddProductForm.module.scss';
import './DiaryAddProductFormAnimation.scss';
import Button from '../shared/Button/Button';
import back from '../../img/back-arrow.svg';
import api from '../../services/backend.service';
import { addProduct } from '../../redux/user/userOperations';
import globalSelectors from '../../redux/global/globalSelectors';

const AddProdSchema = Yup.object().shape({
  product: Yup.string().required('Required field *'),
  weight: Yup.number().required('Required field *'),
});

const DiaryAddProductForm = ({ date, mobile }) => {
  const [renderMarker, setRenderMarker] = useState(false);
  const [products, setProducts] = useState([]);
  const [choosenProductId, setChoosenProductId] = useState('');
  const [error, setError] = useState(null);

  const isLoading = useSelector(globalSelectors.getLoading);
  const dispatch = useDispatch();

  const handleClick = () => {
    setRenderMarker((prevState) => !prevState);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query === '') {
        return;
      }
      setChoosenProductId('');
      api
        .searchProduct(query)
        .then(({ data }) => {
          setProducts(data);
          if (data.length === 1) {
            setChoosenProductId(data[0]._id);
          }
        })
        .catch((err) => {
          setError(err.response?.data.message || err.message);
          setProducts([]);
        });
    }, 400),
    [],
  );

  const handleChangeField = ({ target }) => {
    debouncedSearch(target.value);
    setError(null);
  };

  const handleSubmit = (values, { resetForm }) => {
    const product = {
      date,
      productId: choosenProductId,
      weight: values.weight,
    };
    dispatch(addProduct(product));
    resetForm();
  };

  const form = (
    <Formik
      initialValues={{
        weight: '100',
        product: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={AddProdSchema}
    >
      {({ setFieldValue, handleChange, handleBlur, errors, touched }) => (
        <Form className={css.modalForm}>
          <label className={css.formLabel}>
            <Field
              className={`${css.DailyCaloriesFormInput} ${errors.product && touched.product ? css.errorInput : ''}`}
              onBlur={(e) => {
                handleBlur(e);

                setTimeout(() => {
                  setProducts([]);
                }, 300);
              }}
              onChange={(e) => {
                handleChange(e);
                handleChangeField(e);
              }}
              name="product"
              placeholder="Enter the product name*"
              type="text"
              autoComplete="off"
            />
          </label>
          <div className={css.productListWrapper}>
            {!!products.length ? (
              <ul className={`${css.autocomplete}  ${css.scrollbar}`}>
                {products.map((product) => (
                  <li
                    key={product._id}
                    className={css.autocompleteItem}
                    onClick={() => {
                      setFieldValue('product', product.title.en);
                      setProducts([]);
                      setChoosenProductId(product._id);
                    }}
                  >
                    {product.title.en}
                  </li>
                ))}
              </ul>
            ) : (
              error && <p className={css.errorMes}>{error}</p>
            )}
          </div>
          <label className={css.formLabel}>
            <Field
              className={` ${css.gramms} ${css.DailyCaloriesFormInput} ${
                errors.weight && touched.weight ? css.errorInput : ''
              }`}
              name="weight"
              placeholder="Grams *"
              type="number"
            />
          </label>
          {window.innerWidth < 650 ? (
            <Button type="submit" className={css.secondaryButton} disabled={isLoading}>
              Добавить
            </Button>
          ) : (
            <Button type="submit" className={css.plusButton} disabled={isLoading}>
              +
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );

  if (mobile) {
    return (
      <>
        <div className={css.triggerButtonWrapper}>
          <button type="button" onClick={handleClick} className={css.triggerButton}>
            +
          </button>
        </div>
        {renderMarker && (
          <div className={css.modal}>
            <div className={css.buttonWrapper}>
              <button onClick={handleClick} type="button" className={css.closeModal}>
                <img src={back} alt="back-arrow" />
              </button>
            </div>
            {form}
          </div>
        )}
      </>
    );
  } else {
    return <>{form}</>;
  }
};

export default DiaryAddProductForm;
