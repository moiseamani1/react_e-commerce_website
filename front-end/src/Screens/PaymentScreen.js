import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../Actions/cartActions';
import CheckoutSteps from '../Components/checkOutSteps';
import { Form, Image } from 'semantic-ui-react';

function PaymentScreen(props) {

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: pMethod } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }


  const [paymentMethod, setPaymentMethod] = useState(pMethod);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <form className="ui form form-section payment-form" onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Payment</h2>
          </li>
          <div className="payment-logos">
            <Form.Radio


              type="radio"
              name="paymentMethod"
              id="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Radio>

            <img src='/images/payment/paypal.svg' />



          </div>

          <div className="payment-logos"><Form.Radio


            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            onChange={(e) => setPaymentMethod(e.target.value)}>

          </Form.Radio>

            <img src='/images/payment/stripe.png' /></div>




          <li>
            <button type="submit" className='ui grey button'>
              Continue
              </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default PaymentScreen;