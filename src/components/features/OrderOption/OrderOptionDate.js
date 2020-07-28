import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';

class OrderOptionDate extends React.Component {
 
  state = {
    startDate: new Date(),
  };
 
  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };
 
  render() {
    const { currentValue, setOptionValue} = this.props;

    return (
      <DatePicker
        selected={currentValue}
        onChange={setOptionValue}
        dateFormat="dd/MM/yyyy"
      />
    );
  }
}

OrderOptionDate.propTypes = {
  currentValue: PropTypes.date,
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;