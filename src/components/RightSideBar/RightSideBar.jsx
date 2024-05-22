import { connect } from 'react-redux';
import React, { Component } from 'react';
import selectors from '../../redux/user/userSelectors';
import globalSelectors from '../../redux/global/globalSelectors';
// import PropTypes from 'prop-types';
import classes from './rightSideBar.module.scss';
import SmallLoader from '../shared/SmallLoader';

const initialState = {
  kcalLeft: 0,
  kcalConsumed: 0,
  dailyRate: 0,
  percentsOfDailyRate: 0,
};

class RightSideBar extends Component {
  state = {
    dailyNorm: {},
  };

  dataToRender = () => {
    const {
      summaries,
      daySummary,
      currentDay,
      dailyRate,
      userDataDailyRate,
    } = this.props;
    const date = currentDay ? currentDay : new Date().toJSON().slice(0, 10);

    if ((!dailyRate && !userDataDailyRate) || !daySummary.dailyRate) {
      this.setState({
        dailyNorm: { ...initialState, date },
      });
      return;
    }
    if (summaries.length) {
      this.setState({
        dailyNorm: summaries.find(
          summary =>
            summary.date === (daySummary.date ? daySummary.date : date),
        ) || { ...daySummary, date },
      });
    } else {
      this.setState({
        dailyNorm: { ...daySummary, date },
      });
    }
  };
  componentDidMount() {
    this.dataToRender();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.summaries !== this.props.summaries ||
      prevProps.daySummary !== this.props.daySummary
    ) {
      this.dataToRender();
    }
  }

  render() {
    const { notAllowedProducts } = this.props;
    const {
      date,
      kcalLeft,
      kcalConsumed,
      dailyRate,
      percentsOfDailyRate,
    } = this.state.dailyNorm ? this.state.dailyNorm : initialState;
    return (
      <>
        <section className={classes.section__rightSideBar}>
          <div className={classes.conteiner__rightSideBar}>
            <div className={classes.rightSideBar}>
              {/* <div className={classes.backgroundSideBar}></div> */}
              <div className={classes.sideBar__BlocList}>
                <h2 className={classes.title}>Сводка за {date}</h2>
                {this.props.isLoading ? <SmallLoader/> :
                <div className={classes.rightSideBar__lists}>
                  <ul className={classes.sideBar__list}>
                    <li>Осталось</li>
                    <li>Употреблено</li>
                    <li>Дневная норма</li>
                    <li>n% от нормы</li>
                  </ul>
                  <ul className={classes.sideBar__list}>
                    <li>{kcalLeft} ккал</li>
                    <li>{Math.round(kcalConsumed)} ккал</li>
                    <li>{dailyRate} ккал</li>
                    <li>{Math.round(percentsOfDailyRate)} %</li>
                  </ul>
                </div>
               }
              </div>

              <div className={classes.sideBar__BlocDescription}>
                <h2 className={classes.title}>Нерекомендуемые продукты</h2>
                <div
                  className={`${classes.notAllowedProductsList} ${classes.scrollbar}`}
                >
                  {notAllowedProducts.map(product => (
                    <span key={product}>{product}, </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  summaries: selectors.getSummaries(state),
  currentDayId: selectors.getCurrentDayId(state),
  currentDay: selectors.getCurrentDay(state),
  daySummary: selectors.getDaySummary(state),
  dailyRate: selectors.getCalories(state),
  userDataDailyRate: selectors.getUserDataDailyRate(state),
  notAllowedProducts: selectors.getnotAllowedProducts(state),
  c: globalSelectors.getLoading(state)
});

export default connect(mapStateToProps)(RightSideBar);

// import { useSelector } from 'react-redux';
// import React, { useEffect, useState ,useRef} from 'react';
// import userSelectors from '../../redux/user/userSelectors';
// import globalSelectors from '../../redux/global/globalSelectors';
// // import PropTypes from 'prop-types';
// import classes from './rightSideBar.module.scss';
// import SmallLoader from '../shared/SmallLoader';
// function RightSideBar() {
  
//   function initialState() {
//     return {
//       kcalLeft: 0,
//       kcalConsumed: 0,
//       dailyRate: 0,
//       percentsOfDailyRate: 0,
//     };
//   }
//   let [dailyNorm, setdailyNorm] = useState(() => initialState());



//   // const [dailyNorm, setdailyNorm] = useState(() => {
//   //   const initialState = someExpensiveComputation();
//   //   return initialState;
//   // });
//   // function someExpensiveComputation () {
//   //   return{
//   //     kcalLeft: 0,
//   //     kcalConsumed: 0,
//   //     dailyRate: 0,
//   //     percentsOfDailyRate: 0,
//   //   }
//   // }





//   const summaries = useSelector(userSelectors.getSummaries);
//   const currentDayId = useSelector(userSelectors.getCurrentDayId);
//   const currentDay = useSelector(userSelectors.getCurrentDay);
//   const daySummary = useSelector(userSelectors.getDaySummary);
//   // const dailyRate = useSelector(userSelectors.getCalories)
//   const userDataDailyRate = useSelector(userSelectors.getUserDataDailyRate);
//   const notAllowedProducts = useSelector(userSelectors.getnotAllowedProducts);
//   const isLoading = useSelector(globalSelectors.getLoading);

//   const dataToRender = () => {
//     const date = currentDay ? currentDay : new Date().toJSON().slice(0, 10);

//     if ((!dailyRate && !userDataDailyRate) || !daySummary.dailyRate) {
//       setdailyNorm({ ...dailyNorm, date });
//       return;
//     }
//     if (summaries.length) {
//       setdailyNorm(
//         summaries.find(
//           summary =>
//             summary.date === (daySummary.date ? daySummary.date : date),
//         ) || { ...daySummary, date },
//       );
//     } else {
//       setdailyNorm({
//         ...daySummary,
//         date,
//       });
//     }
//   };

//   useEffect(() => {
//     dataToRender();
//   }, [summaries, daySummary]);

//   // const { notAllowedProducts } = this.props;
//   const {
//     date,
//     kcalLeft,
//     dailyRate,
//     kcalConsumed,
//     percentsOfDailyRate,
//   } = dailyNorm ? dailyNorm : initialState();

//   return (
//     <>
//       <section className={classes.section__rightSideBar}>
//         <div className={classes.conteiner__rightSideBar}>
//           <div className={classes.rightSideBar}>
//             {/* <div className={classes.backgroundSideBar}></div> */}
//             <div className={classes.sideBar__BlocList}>
//               <h2 className={classes.title}>Сводка за {date}</h2>
//               {isLoading ? (
//                 <SmallLoader />
//               ) : (
//                 <div className={classes.rightSideBar__lists}>
//                   <ul className={classes.sideBar__list}>
//                     <li>Осталось</li>
//                     <li>Употреблено</li>
//                     <li>Дневная норма</li>
//                     <li>n% от нормы</li>
//                   </ul>
//                   <ul className={classes.sideBar__list}>
//                     <li>{kcalLeft} ккал</li>
//                     <li>{Math.round(kcalConsumed)} ккал</li>
//                     <li>{dailyRate} ккал</li>
//                     <li>{Math.round(percentsOfDailyRate)} %</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//             <div className={classes.sideBar__BlocDescription}>
//               <h2 className={classes.title}>Нерекомендуемые продукты</h2>
//               <div
//                 className={`${classes.notAllowedProductsList} ${classes.scrollbar}`}
//               >
//                 {notAllowedProducts.map(product => (
//                   <span key={product}>{product}, </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
// export default RightSideBar;
