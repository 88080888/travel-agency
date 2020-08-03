import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

class OrderOptionDate extends React.Component {
 
  render() {
    const { currentValue, setOptionValue} = this.props;

    return (
      <DatePicker
        className={styles.input}
        selected={currentValue}
        onChange={setOptionValue}
        dateFormat="dd.MM.yyyy"
      />
    );
  }
}

OrderOptionDate.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;