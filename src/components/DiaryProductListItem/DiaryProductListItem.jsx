import { connect } from 'react-redux';
import React from 'react';
import styles from './DiaryProductListItem.module.scss';
import { deleteEatenProduct } from '../../redux/user/userOperations';
import IconClose from '../shared/IconClose/IconClose';
import selectors from '../../redux/user/userSelectors';

const DiaryProductListItem = ({
	name,
	cal,
	weight,
	dayId,
	productId,
	deleteProduct,
	date
}) => {
	return (
		<li className={styles.list}>
			<span className={styles.listName}>{name}</span>
			<span className={styles.listWeight}>{weight} г</span>
			<span className={styles.listCalories}>
				{Math.round(cal)} <span className={styles.ccal}>ккал</span>
			</span>

			<button
				className={styles.listButton}
				onClick={() =>
					deleteProduct(
						{
							dayId,
							eatenProductId: productId
						},
						date
					)
				}
			>
				<IconClose />
			</button>
		</li>
	);
};

const mapDispatchToProps = {
	deleteProduct: deleteEatenProduct
};

const mapStateToProps = (state) => ({
	dayId: selectors.getCurrentDayId(state),
	date: selectors.getDaySummary(state).date
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DiaryProductListItem);
