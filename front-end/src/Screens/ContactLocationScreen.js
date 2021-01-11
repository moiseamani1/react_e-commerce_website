import React, { useEffect, useState, getState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Grid, GridColumn } from 'semantic-ui-react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import dotenv from 'dotenv';
import properties from '../properties'


import MyMap from '../Components/map';
import Axios from 'axios';


const api = properties.GOOGLE_API_KEY;

function ContactLocationScreen(props) {




    const [orderId, setOrderId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');





    const submitEmail = (e) => {
        e.preventDefault();
        Axios({
            method: "POST",
            url: "/api/mailing/send",
            data: { name: name, email: email, orderId: orderId, phone: phone, message: message }
        }).then((response) => {
            if (response.data.status === 'success') {
                alert("Message Sent.");
                resetForm()
            } else if (response.data.status === 'fail') {
                alert("Message failed to send.")
            }
        })
    }
    const resetForm = () => {
        setName('');
        setEmail('')
        setOrderId('');
        setPhone('');
        setMessage('');
    }








    const getDirectionsHandler = () => {
        // window.location.assign("https://goo.gl/maps/kfbUhUX6GPRNc6HU6")
        window.open("https://goo.gl/maps/kfbUhUX6GPRNc6HU6", '_blank');
    }


    return (
        <div>

            <Grid padded centered>

                <Grid.Row>
                    <Grid.Column>


                        <Container className='map-container'>

                            <h1>Contact & Location</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
</p>
                        </Container>

                    </Grid.Column>

                </Grid.Row>




            </Grid>
            <Container >
                <MyMap className="mymap"></MyMap>

                <Grid stackable padded centered className="location-phone">
                    <Grid.Column width={8} >
                        <h5>Location</h5>
                        <h3>184 Narnia World,
Puppyheaven, Ontario, Canada</h3>
                        <Button className="ui grey button" onClick={getDirectionsHandler} >GET DIRECTIONS</Button>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <h5>Phone</h5>
                        <h3>123-456-78910-11</h3>
                    </Grid.Column>

                </Grid>


                <Grid stackable columns='equal' id='contact-form-grid'>
                    <Grid.Column>

                        <h1>PUPSONS BAY STORE</h1>
                        <p>If you have any questions feel free to contact us. Don't forget to take a look at our shipping, returns and FAQ for common inquirires.</p>

                        <h4>Email</h4>
                        <p>customersupport@pupsonbay.ca</p>

                    </Grid.Column>
                    <Grid.Column><Form id="contact-form" onSubmit={submitEmail.bind(this)} method="POST">
                        <h3>If you have any questions, please fill out and submit the following form.</h3>
                        <Form.Input fluid label='Name' type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Email' type="email" name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)}></Form.Input>
                            <Form.Input fluid label='Phone' type="text" name="phone" value={phone} id="phone" onChange={(e) => setPhone(e.target.value)}></Form.Input>
                        </Form.Group>
                        <Form.Input fluid label='OrderID' type="text" name="orderId" value={orderId} id="orderId" onChange={(e) => setOrderId(e.target.value)}></Form.Input>
                        <Form.TextArea label="Message" name="message" value={message} id="message" onChange={(e) => setMessage(e.target.value)} />

                        <div><button type="submit" class='ui button teal full-width'>Submit</button></div>


                    </Form></Grid.Column>

                </Grid>

            </Container>




        </div>












    )
}
export default GoogleApiWrapper({
    apiKey: api
})(ContactLocationScreen);
