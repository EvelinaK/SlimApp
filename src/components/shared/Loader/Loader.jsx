import React from 'react';
import './Loader.scss'
import banana from '../../../img/bananasmall.png'
import pear from '../../../img/pear.png'
import pineapple from '../../../img/pineapple.png'
import strawberry from '../../../img/strawberry.png'

const Loader = () => (
  <div className="loadingio-spinner-cube-xg2z20afr8s">
    <div className="ldio-rv349ubc7lm">
      <img src={banana} alt="" className="fruits" />
      <img src={pear} alt="" className="fruits" />
      <img src={pineapple} alt="" className="fruits" />
      <img src={strawberry} alt="" className="fruits"/>
    </div>
  </div>
);


export default Loader;
