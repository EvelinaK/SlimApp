import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import { connect } from 'react-redux';
import action from '../../redux/alert/alertAction';

class Alert extends Component {
  state = {
    isAlertShow: false,
  };
  delayToCloseAlert = null;

  componentDidUpdate(prevProps, prevState) {
    if (this.props.state.error && this.props.state.error !== prevProps.state.error) {
      clearTimeout(this.delayToCloseAlert);
      this.setState((state) => ({ isAlertShow: true }));
      this.delayToCloseAlert = setTimeout(() => {
        this.setState((state) => ({ isAlertShow: false }));
        this.props.action_alertOff();
      }, 3000);
    }
  }

  render() {

    return (
      <CSSTransition in={this.state.isAlertShow} classNames="alert-global" timeout={250} unmountOnExit>
        <div className="alert-global">
          <p>{`${this.props.state.error}`}</p>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    action_alertOff: () => {
      dispatch(action.alertOff());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
