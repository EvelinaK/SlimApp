import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import Calendar from "react-calendar";
import "./SetDate.scss";

import "react-calendar/dist/Calendar.css";

class SetDate extends Component {
  state = {
    isShowCalendar: false,
    currentDate: new Date(),
    currentValue: new Date(),
    outputValue: "",
  };

  showCalendar = (event) => {
    this.setState((state) => {
      return {
        isShowCalendar: !state.isShowCalendar,
      };
    });
  };

  setDate = (value) => {
    const year = value.getFullYear();
    const month =
      value.getMonth() < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1;
    const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
    this.setState((state) => {
      return {
        isShowCalendar: !state.isShowCalendar,
        currentValue: value,
        outputValue: `${day}.${month}.${year}`,
      };
    });
    // day = String(day);
    // day.length === 1 ? (day = `0${day}`) : (day = day);
    this.props.value(`${year}-${month}-${day}`);
  };

  componentDidMount() {
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month =
    //   currentDate.getMonth() < 10
    //     ? `0${currentDate.getMonth() + 1}`
    //     : currentDate.getMonth() + 1;
    // const day =
    //   currentDate.getDate() < 10
    //     ? `0${currentDate.getDate()}`
    //     : currentDate.getDate();
    const dateArr = this.props.currentDate.split('-');
    const outputValue = dateArr.reverse().join('.');

    this.setState(state => {
      return {
        outputValue: outputValue, //`${day}.${month}.${year}`,
        currentValue: new Date(this.props.currentDate),
        currentDate: new Date(this.props.currentDate),
      };
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currentDate !== this.props.currentDate) {
      const dateArr = this.props.currentDate.split("-");
      const outputValue = dateArr.reverse().join(".");
  
      this.setState((state) => {
        return {
          outputValue: outputValue, //`${day}.${month}.${year}`,
          currentValue: new Date(this.props.currentDate),
          currentDate: new Date(this.props.currentDate),
        };
      });
    }
  }

  render() {
    return (
      <div className="setdate">
        <p className="setdate-title">{this.state.outputValue}</p>
        <input
          className="setdate-btn"
          type="button"
          value=""
          onClick={this.showCalendar}
        />
        <CSSTransition
          in={this.state.isShowCalendar}
          timeout={150}
          classNames="react-calendar"
          unmountOnExit
        >
          <Calendar onChange={this.setDate} value={this.state.currentValue} />
        </CSSTransition>
      </div>
    );
  }
}

export default SetDate;

SetDate.propTypes = {
  value: PropTypes.func,
  currentDate: PropTypes.string,
};

SetDate.defaultProps = {
  value() {},
  currentDate: new Date().toJSON().slice(0, 10),
};
