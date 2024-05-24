import React, { Component } from 'react';

class Decoration extends Component {
  state = {};
  render() {
    let addStyle = '';
    if (this.props.isLoginPage) {
      addStyle = '-login';
    } else if (this.props.isCalculationPage) {
      addStyle = '-calculation';
    }
    return (
      <section className={`decoration${addStyle}`}>
        <div className="dec-spot"></div>
        <div className="dec-strawberry"></div>
        <div className="dec-leaves"></div>
        <div className="dec-banana"></div>
      </section>
    );
  }
}

export default Decoration;
