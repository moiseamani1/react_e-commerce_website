import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';


function ShippingReturnsScreen(props) {


        return (


                <Grid centered columns={1}>
                        <Grid.Column className="shippingreturnscontent">
                                <Container className='shippingreturns-items' textAlign={"left"} text> <h1>SHIPPING</h1>
                                        <p>All purchased product within Canada and United States are shipped using traceable methods. Once the product is shipped, the tracking number, along with all shipping information will be sent to the customer via email. Once this information has been provided to the customer, the customer assumes all responsibility for lost or damaged packages/product. If a payment is made using an eCheck in PayPal, PUPSON'S BAY will not ship the order until the eCheck payment has cleared.</p>
                                        <p>Customers outside of North America should note that products may or may not be shipped using non-trackable methods, therefore shipped at the risk of the customer. PUPSON'S BAY will not be held responsible for lost or damaged packages/product.</p>

                                        <h1>RETURNS POLICY</h1>
                                        <p>As long as an item is still in its original condition, we accept returns for free, subject to the rules below, which includes rules about fair use. None of these rules affect your statutory rights.
</p>
                                        <p>If you return an item requesting a refund within 20 days of the item being delivered to you or available for collection, we'll give you a full refund by way of the original payment method.
</p>
                                        <p>We aim to refund you within 7 days of receiving the returned item.</p>
                                        <p>If you request a refund for an item during the above time frames but you can't return it to us for some reason, please get in touch - but any refund will be at our discretion.</p>

                                </Container>

                        </Grid.Column>


                </Grid>)
}

export default ShippingReturnsScreen;