import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dimmer, Grid, Loader, Message, Divider, List } from 'semantic-ui-react';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { detailsOrder, payOrder } from '../Actions/orderActions';
import { ORDER_PAY_RESET } from '../Constants/orderConstants';






function OrderScreen(props) {

  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;



  const dispatch = useDispatch();


  useEffect(() => {

    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/property/paypal');
      console.log('data from server:' + data)
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {

        if (!window.paypal) {
          addPayPalScript();
        } else {
          if (!sdkReady) {
            setSdkReady(true);
          }
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };




  return (


    <Grid container centered columns={1}>

      {loading ? (
        <Dimmer active inverted>
          <Loader size='huge'>Loading</Loader>
        </Dimmer>
      ) : error ? (<Message negative header={error} />

      ) : (

            <Grid.Column width={10} className="order-summary-main-column">
              <h1>Order {order._id}</h1>

              <div className="order-summary-section">
                <h2>Shipping</h2>
                <Divider></Divider>
                <div>Name: <strong>
                  {order.shippingAddress.fullName}</strong></div>

                <div> Address: <strong>{order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}</strong>

                </div>

              </div>


              {order.isDelivered ? (

                <Message positive header={"Delivered at" + order.deliveredAt} />
              ) : (
                  <Message info header={"Not Delivered yet"} />
                )}

              <div className="order-summary-section">
                <h2>Payment</h2>
                <Divider></Divider>
                <div>
                  <p>Method: <strong>{order.paymentMethod}</strong> </p>
                </div>

                {order.isPaid ? (
                  <Message positive header={'Paid at ' + order.paidAt} />
                ) : (!order.isPaid) ? (

                  sdkReady ? <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  ></PayPalButton> : <></>
                ) : (
                      // <Message info header={"Payment not processed "+sdkReady}/>
                      <></>)

                }
                {errorPay && (
                  <Message negative header={errorPay} />
                )}
                {loadingPay && <p>Loading...</p>}

              </div>

              <div className="order-summary-section">
                <List>
                  <List.Item><h2>Order Summary</h2></List.Item>
                  <Divider></Divider>
                  <List.Item>     <h4>Items</h4>
                    <div>${order.itemsPrice}</div></List.Item>
                  <List.Item>   <h4>Shipping</h4>
                    <div>${order.shippingPrice}</div></List.Item>
                  <List.Item><h4>Tax</h4>
                    <div>${order.taxPrice}</div></List.Item>
                  <List.Item><h4>Order Total</h4>
                    <div>${order.totalPrice}</div></List.Item>
                </List>

              </div>


              <div className="order-summary-section">
                <h2>Order Items</h2>
                <Divider></Divider>
                <List>
                  {order.orderItems.map((item) => (
                    <List.Item>
                      <div className="order-summary-item">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                          ></img>
                        </div>

                        <div className="order-summary-item-name">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="order-summary-item-price">
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
                        </div>



                      </div>




                    </List.Item>
                  )
                  )



                  }


                </List>

              </div>




              <></>
            </Grid.Column>)




      }
    </Grid>
  )
}

export default OrderScreen;