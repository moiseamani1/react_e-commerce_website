

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dimmer, Grid, Loader, Message, Divider, Segment } from 'semantic-ui-react';
import { listMyOrders } from '../Actions/orderActions';
import dateFormat from 'dateformat';







function MyOrdersScreen(props) {
    const myOrdersList = useSelector((state) => state.myOrdersList);
    const { loading, error, orders } = myOrdersList;


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listMyOrders());
    }, [dispatch]);









    return (


        <Grid container centered columns={1}>

            {loading ? (
                <Dimmer active inverted>
                    <Loader size='huge'>Loading</Loader>
                </Dimmer>
            ) : error ? (<Message negative header={error} />

            ) : (

                        <Grid.Column width={10} className="my-order-list-main-column">
                            <h1>My Orders</h1>
                            <Divider></Divider>
                            {orders.map((order) => (
                                <Segment
                                    key={order._id}
                                    className="order-list-segments"
                                >

                                    <div className='order-list-section'>
                                        <div>
                                            <h3>Order Reference</h3>
                                            <p>{order._id}</p>
                                            <h3>Total</h3>
                                            <p>{order.totalPrice} CAD$</p>
                                            <h3>Delivery</h3>
                                            <p>{order.isDelivered ? order.deliveredAt : 'in Transit'}</p>

                                        </div>

                                        <div>
                                            <h3>Order Date</h3>
                                            <p>{dateFormat(order.createdAt, "h:MM:ss TT, mmmm dS, yyyy")}</p>
                                            <h3>Payment (Date)</h3>
                                            <p>{order.isPaid ? dateFormat(order.paidAt, "h:MM:ss TT, mmmm dS, yyyy") : 'Awaiting (Action required)'}</p>
                                            <Link onClick={() => { window.location.href = '/order/' + order._id; }}>View Details</Link>

                                        </div>
                                    </div>


                                </Segment>))

                            }


                            <></>
                        </Grid.Column>)




            }
        </Grid>
    )
}

export default MyOrdersScreen;