import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './DiaryProductsList.module.scss';
import DiaryProductsListItem from '../DiaryProductListItem';
import { getProducts } from '../../redux/user/userOperations.js';
import globalSelectors from '../../redux/global/globalSelectors';
import SmallLoader from '../shared/SmallLoader';
import userSelectors from '../../redux/user/userSelectors';
import { useSelector, useDispatch } from 'react-redux';

const DiaryProductsList = ({ date }) => {
  const dispatch = useDispatch();
  const products = useSelector(userSelectors.getProductsSelectors);
  const isLoading = useSelector(globalSelectors.getLoading);

  useEffect(() => {
    if (date) {
      dispatch(getProducts(date));
    }
  }, [dispatch, date]);

  return (
    <>
      {isLoading && (
        <div className={styles.SmallLoaderContainer}>
          <SmallLoader />
        </div>
      )}
      <ul className={`${styles.productList} ${styles.scrollbar}`}>
        {!!products.length &&
          products.map((product) => (
            <DiaryProductsListItem
              key={product.id}
              name={product.title}
              weight={product.weight}
              cal={product.kcal}
              productId={product.id}
            />
          ))}
      </ul>
    </>
  );
};

DiaryProductsList.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DiaryProductsList;
