import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Dimmer, Message, Form } from 'semantic-ui-react';
import { listOrders, deleteOrder, saveOrder } from '../Actions/orderActions';
import dateFormat from 'dateformat';



function OrdersScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [shippingPrice, setShippingPrice] = useState('');
  const [city, setCity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const [delivered, setDelivered] = useState('');
  const [postal, setPostal] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [country, setCountry] = useState('');

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { loading: loadingDelete, error: errorDelete, success } = orderDelete;

  const orderSave = useSelector((state) => state.orderSave);
  const { loading: loadingSave, error: errorSave, success: successSave } = orderSave;





  const dispatch = useDispatch();











  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, success]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id))
  };


  const openModal = (order) => {
    setModalVisible(true);
    // setId(product._id);
    // setName(product.name);
    // setPrice(product.price); setImage(product.image); setBrand(product.brand);
    // setColor(product.color); setCategory(product.category);
    // setInventory(product.inventory); setDescription(product.description);
    // setFeatured(product.featured);
  }



  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch(saveProduct({ _id: id, name, price, image, brand,color, category, inventory, description,featured }));

    // dispatch(saveOrder(order))

  }




  return (
    <div className='content content-margined'>
      <h2>Orders</h2>
      {loading ? (
        <Dimmer active inverted>
          <Loader size='huge'>Loading</Loader>
        </Dimmer>
      ) : error ? (
        <Message negative header={error} />
      ) : (
            <div>
              {modalVisible && <div className="form-section">
                <form class="ui form" onSubmit={submitHandler}>
                  <ul className="form-container">
                    <li>
                      <button type="button" onClick={() => setModalVisible(false)} class='ui inverted button blue'>Back</button>
                    </li>
                    <li>
                      <h1>Update Order</h1>
                    </li>
                    <li> {loadingSave && <div>Loading...</div>}</li>
                    <li> {errorSave && <div>{errorSave}</div>}</li>
                    <Form.Input fluid label='Name' type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                    <Form.Input fluid label='Street' type="text" name="street" value={street} id="street" onChange={(e) => setStreet(e.target.value)} />
                    <Form.Input fluid label='City' type="text" name="city" value={city} id="city" onChange={(e) => setCity(e.target.value)} />
                    <Form.Input fluid label='Postal' type="text" name="postal" value={postal} id="postal" onChange={(e) => setPostal(e.target.value)} />
                    <Form.Input fluid label='Country' type="text" name="country" value={country} id="country" onChange={(e) => setCountry(e.target.value)} />
                    {/* Loop through order items here  */}
                    <Form.Group widths='equal'>
                      <Form.Input fluid label='Price' type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></Form.Input>
                      <Form.Input fluid label='Quantity' type="quantity" name="quantity" value={quantity} id="quantity" onChange={(e) => setQuantity(e.target.value)}></Form.Input>
                    </Form.Group>

                    <Form.Input fluid label='Shipping Price' type="text" name="shiipingPrice" value={shippingPrice} id="category" onChange={(e) => setShippingPrice(e.target.value)} />
                    <Form.TextArea label="Payment Method" name="paymentMethod" value={paymentMethod} id="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} />
                    <Form.Checkbox checked={delivered} label='Delivered' name="delivered" id="delivered" onChange={(e) => setDelivered(e.target.checked)} />
                    <li>
                      <button type="submit" class='ui button grey'>Update Order</button>
                    </li>
                  </ul>

                </form> </div>}





              <div className='order-list'>
                <table className="order-list-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>USER_ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user}</td>
                        <td>{dateFormat(order.createdAt, "h:MM:ss TT, mmmm dS, yyyy")}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? dateFormat(order.paidAt, "h:MM:ss TT, mmmm dS, yyyy") : 'No'}</td>
                        <td>
                          {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : 'No'}
                        </td>
                        <td>
                          <button
                            class='ui orange inverted button'
                            onClick={() => openModal({})}
                          >
                            Update
                    </button>

                          <button
                            class='ui blue inverted button'
                            onClick={() => {
                              props.history.push(`/order/${order._id}`);
                            }}
                          >
                            Details
                    </button>
                          <button
                            class='ui red inverted button'
                            onClick={() => deleteHandler(order)}
                          >
                            Delete
                    </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
    </div>
  );
}

export default OrdersScreen;