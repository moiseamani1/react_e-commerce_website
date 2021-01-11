import { set } from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Grid, Icon, Message, List } from 'semantic-ui-react';
import { detailsUser, updateUserProfile } from '../Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../Constants/userConstants';

function ProfileScreen(props) {


    const [modalVisible, setModalVisible] = useState(false);
    const [addShippingModalVisible, setShippingModalVisible] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState([]);


    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('');

    const [deletingAddress, setDeletingAddress] = useState(false);







    //     const [password, setPassword] = useState('');
    //   const [confirmPassword, setConfirmPassword] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate, } = userUpdateProfile;

    // if (!userLogin.userInfo) {
    //     props.history.push('/login');

    //   }


    // const [id, setId] = useState(userInfo._id);

    // const productSave = useSelector(state => state.productSave);
    // const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const dispatch = useDispatch();

    useEffect(() => {
        // if (!user) {
        //     dispatch({ type: USER_UPDATE_PROFILE_RESET });
        //     dispatch(detailsUser(userInfo._id));
        //   } else {
        //     setName(user.name);
        //     setEmail(user.email);
        //     setShippingAddress(user.shippingAddress||[])

        //   }


        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            // dispatch({ type: USER_UPDATE_PROFILE_RESET });
            // dispatch(detailsUser(userInfo._id));
            setName(user.name);
            setEmail(user.email);
            setShippingAddress(user.shippingAddress || [])
        }




    }, [dispatch, userInfo._id, user]);

    // useEffect(() => {
    //   if (successSave) {
    //       setModalVisible(false);
    //       return () => {};
    //   }
    //   if(!user.name){
    //       dispatch(detailsUser(userLogin.userInfo._id));

    //   } else {
    //       setName(user.name);
    //       setEmail(user.email);
    //     }


    //   return () => {};
    // }, [ user,successSave, dispatch,userLogin.userInfo._id]);



    const openModal = (user) => {
        setModalVisible(true);
        // setName(user.name);
        // setEmail(user.email); 
    }

    const openShippingModal = () => {
        setShippingModalVisible(true);
    }




    // }, [ user,successSave, dispatch, userLogin.userInfo._id]);

    const deleteAddressHandler = (address) => {
        dispatch(updateUserProfile({ userId: userInfo._id, name, email, shippingAddress: address, isContentManager: userInfo.isContentManager, delAddress: true }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        var shippingAddress = {}
        shippingAddress['street'] = street
        shippingAddress['city'] = city
        shippingAddress['postal'] = postal
        shippingAddress['country'] = country
        // dispatch(saveProduct({ _id: id, name, price, image, brand,color, category, inventory, description,featured }));
        dispatch(updateUserProfile({ userId: userInfo._id, name, email, shippingAddress, isContentManager: userInfo.isContentManager, delAddress: false }))


    }

    return (


        <Grid centered columns={1}>
            <Grid.Column className="profilecontent">
                <Container className='profile-items' textAlign={"left"} text>
                    <h1>MY PROFILE</h1>
                    <Divider></Divider>
                    {modalVisible && <div className="form-section">
                        <form class="ui form" onSubmit={submitHandler}>
                            <ul className="form-container">
                                <li>
                                    <button type="button" onClick={() => setModalVisible(false)} class='ui inverted button blue'>Back</button>
                                </li>
                                <li>
                                    <h1>Edit Profile</h1>
                                </li>
                                <li> {loadingUpdate && <div>Loading...</div>}</li>
                                <li> {errorUpdate && <div>{errorUpdate}</div>}</li>
                                {successUpdate && (<Message positive>
                                    <Message.Header>Profile updated successfully!</Message.Header>

                                </Message>)}

                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Name' type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                                    <Form.Input fluid label='Email' type="email" name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)}></Form.Input>
                                </Form.Group>

                                {/* <Form.Checkbox  checked={newsletter} label='Newsletter' name="newsletter" id="newsletter" onChange={(e) => setNewsletter(e.target.checked)}/> */}
                                <li>
                                    <Button type="submit" color='grey'>Edit Profile</Button>
                                </li>
                            </ul>

                        </form> </div>}

                    <div className="profile-details-section"><h3>ACCOUNT DETAILS</h3> <Button icon color={"orange"} onClick={() => openModal({})}> <Icon name='pencil' /></Button></div>
                    <h5>Name</h5>


                    <p>{name}</p>

                    <h5>Email</h5>
                    <p>{email}</p>



                    {addShippingModalVisible && <div className="form-section">
                        <form class="ui form" onSubmit={submitHandler}>
                            <ul className="form-container">
                                <li>
                                    <button type="button" onClick={() => setShippingModalVisible(false)} class='ui inverted button blue'>Back</button>
                                </li>
                                <li>
                                    <h1>Add Shipping Address</h1>
                                </li>
                                <li> {loadingUpdate && <div>Loading...</div>}</li>
                                <li> {errorUpdate && <div>{errorUpdate}</div>}</li>
                                {successUpdate && (<Message positive>
                                    <Message.Header>Shipping address added successfully!</Message.Header>

                                </Message>)}


                                <Form.Input fluid label='Street' type="text" name="street" value={street} id="street" onChange={(e) => setStreet(e.target.value)} />
                                <Form.Input fluid label='City' type="text" name="city" value={city} id="city" onChange={(e) => setCity(e.target.value)}></Form.Input>
                                <Form.Input fluid label='Postal Code/Zip' type="text" name="postal" value={postal} id="postal" onChange={(e) => setPostal(e.target.value)}></Form.Input>
                                <Form.Input fluid label='Country' type="text" name="country" value={country} id="country" onChange={(e) => setCountry(e.target.value)}></Form.Input>


                                {/* <Form.Checkbox  checked={newsletter} label='Newsletter' name="newsletter" id="newsletter" onChange={(e) => setNewsletter(e.target.checked)}/> */}
                                <li>
                                    <Button type="submit" color='grey'>Add Address</Button>
                                </li>
                            </ul>

                        </form> </div>}






                    <div className="profile-details-section"> <h3>SHIPPING DETAILS</h3>

                        <div>

                            <Button icon color={"yellow"}
                                onClick={() =>
                                    openShippingModal({})}
                            > <Icon name='plus' /></Button>
                            <Button icon color={"red"}
                                onClick={() => setDeletingAddress(!deletingAddress)
                                }> <Icon name='trash' /></Button>
                        </div>



                    </div>
                    <List  >{shippingAddress.map((address) => (

                        <List.Item> <div><List.Icon inline name='map pin' /> {address.street}, {address.city}, {address.postal}, {address.country}  {deletingAddress && <Icon inline onClick={() => deleteAddressHandler(address)} id='delete-address-icon' name='minus' color='red' />}  </div>   </List.Item>

                    ))}</List>
                    <h3>ORDER HISTORY</h3>
                    <Link to='/myOrders'>View Orders</Link>
                </Container>


            </Grid.Column>

        </Grid>)
}

export default ProfileScreen;