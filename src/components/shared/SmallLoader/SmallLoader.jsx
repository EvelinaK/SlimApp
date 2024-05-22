import React from 'react';


import styles from './SmallLoader.module.scss';
const SmallLoader = () => (

  <div className={styles.loader__wrap}  className="SmallLoaderContainer">
        <div  className={styles.loader__wrap}  role="alertdialog" aria-busy="true" aria-live="polite" aria-label="Loading…">
       <div className={styles.loader}  aria-hidden="true">
         <div className={styles.loader__sq} ></div>
         <div className={styles.loader__sq} ></div>
      </div>
        </div> 

</div>
 
  
);


export default SmallLoader;