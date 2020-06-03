import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';
import { calculateTotal} from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';

class OrderSummary extends React.Component {

  static propTypes = {
    totalCost: PropTypes.node,
    options: PropTypes.object,
  }

  render(){
    const { totalCost, options} = this.props;
    const totalPrice = calculateTotal((formatPrice(totalCost)), options);
    return (
      <h2 className={styles.component}>Total: <strong>{totalPrice}</strong></h2>
    );
  }
}  

export default OrderSummary;