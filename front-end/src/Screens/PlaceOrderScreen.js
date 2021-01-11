import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../Components/checkOutSteps';
import { createOrder } from '../Actions/orderActions';
import { Divider, Grid, Message } from 'semantic-ui-react';
import { ORDER_CREATE_RESET } from '../Constants/orderConstants';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);

  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }



  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;

  const itemsPrice = Number(cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2));
  const shippingPrice = Number(itemsPrice > 100 ? 0 : 10).toFixed(2);
  const taxPrice = Number(0.133 * itemsPrice).toFixed(2);
  const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      ...cart, orderItems: cart.cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice
    })


    );
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
      dispatch({ type: ORDER_CREATE_RESET });
    }

  }, [dispatch, order, props.history, success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            <div>Name: <strong>{cart.shippingAddress.fullName}</strong></div>

            <div>Address: {cart.shippingAddress.address}, {cart.shippingAddress.city},
          {cart.shippingAddress.postalCode}, {cart.shippingAddress.country},</div>

          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <h3>
                Price
          </h3>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <div>
                    <Grid className="full-width " columns={3}>
                      <Grid.Column>
                        <img className="cart-image" src={item.image} alt="product" />
                      </Grid.Column>

                      <Grid.Column>
                        <div className='cart-brand'>
                          {item.brand}
                        </div>
                        <div className="cart-name">
                          <div>
                            <Link to={"/product/" + item.product}>
                              {item.name}
                            </Link>

                          </div>
                          <div className="cart-quantity">
                            Qty: {item.quantity}
                          </div>
                        </div></Grid.Column>
                      <Grid.Column>
                        <div className="cart-price">
                          ${item.price}
                        </div>
                      </Grid.Column>
                    </Grid>

                    <Divider></Divider>
                  </div>




                )
            }
          </ul>
        </div>


      </div>
      <div className="placeorder-action">
        <ul>
          {loading && <span>Loading...</span>}
          {error && <Message negative header={error} />}
          <li>
            <button className="ui teal button full-width" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <Divider></Divider>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;