import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';

class OrderForm extends React.Component {

  static propTypes = {
    tripCost: PropTypes.node,
    options: PropTypes.object,
  }

  render(){
    const { tripCost, options } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <OrderSummary totalCost={tripCost} options={options} />
        </Col>
      </Row>
    );
  }
}  

export default OrderForm;