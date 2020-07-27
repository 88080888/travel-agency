import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';


const sendOrder = (options, tripCost, countryCode, tripName, tripId) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const {contact, name} = options;

  if ( name === '' || name.length < 5 ) {
    alert('Please fill name with 5 or more letters');
    return;
  }
  if ( contact === '' || contact.length < 5 ) {
    alert('Please fill contact with 5 or more letters');
    return;
  }

  const payload = {
    tripId,
    tripName,
    countryCode: countryCode,
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

class OrderForm extends React.Component {



  render(){

    const { tripCost, options, setOrderOption, countryCode, tripName, tripId} = this.props;

    return (
      <Row>
        {pricing.map(option =>
          <Col md={4} key={option.id}>
            <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
          </Col>
        )}
        <Col xs={12}>
          <OrderSummary totalCost={tripCost} options={options}/>
        </Col>
        <Col xs={12}>
          <Button onClick={() => sendOrder(options, tripCost, countryCode, tripName, tripId)}>Order now!</Button>
        </Col>
        
      </Row>
    );
  }
}  

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  countryCode: PropTypes.string,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
};

export default OrderForm;