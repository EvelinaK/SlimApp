import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './DiaryProductsList.module.scss';
import DiaryProductsListItem from '../DiaryProductListItem';
import { getProducts } from '../../redux/user/userOperations.js';
import globalSelectors from '../../redux/global/globalSelectors';
import SmallLoader from '../shared/SmallLoader';
import userSelectors from '../../redux/user/userSelectors';
import { connect } from 'react-redux';

class DiaryProductsList extends Component {
  static props = {
    getProducts: PropTypes.func.isRequired,
    date: PropTypes.string,
  };

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { products } = this.props;

    return (
      <>
        {' '}
        {this.props.isLoading && (
          <div className={styles.SmallLoaderContainer}>
            <SmallLoader />
          </div>
        )}
        <ul className={`${styles.productList} ${styles.scrollbar}`}>
          {!!products.length &&
            products.map((product) => {
              return (
                <DiaryProductsListItem
                  key={product.id}
                  name={product.title}
                  weight={product.weight}
                  cal={product.kcal}
                  productId={product.id}
                />
              );
            })}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: userSelectors.getProductsSelectors(state),
  isLoading: globalSelectors.getLoading(state),
});

export default connect(mapStateToProps, { getProducts })(DiaryProductsList);
