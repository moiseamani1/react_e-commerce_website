import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import ProductsScreen from './Screens/ProductsScreen'
import CartScreen from './Screens/CartScreen';

import LoginScreen from './Screens/LoginScreen';
import CreateAccountScreen from './Screens/CreateAccountScreen';



import { useDispatch, useSelector } from 'react-redux';
import ShippingScreen from './Screens/ShippingScreen';
import ShippingReturnsScreen from './Screens/ShippingReturnsScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import FaqScreen from './Screens/FaqScreen';
import AboutUsScreen from './Screens/AboutUsScreen';
import ContactLocationScreen from './Screens/ContactLocationScreen';
import { Icon, List, Dropdown, Menu, Button, Image, Sidebar, Segment, Grid, Search, Form } from 'semantic-ui-react'
import SearchField from 'react-search-field';

import 'semantic-ui-css/semantic.min.css';
import SearchScreen from './Screens/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen';

import { logout } from './Actions/userActions';
import PrivateRoute from './Components/privateRoute';
import MyOrdersScreen from './Screens/MyOrdersScreen';
import AdminRoute from './Components/adminRoutes';
import ManageOrdersScreen from './Screens/OrdersScreen';
import OrdersScreen from './Screens/OrdersScreen';

// import PrivateRoute from './Components/PrivateRoute';


function App(props) {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [visible, setVisible] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };


  const onSearchClickHandler = (val, e) => {
    window.location.href = "/search/keyword/" + val;
  }

  return (


    <BrowserRouter>
      <Sidebar.Pushable id="main-pushable" className=" main pushable-segment" as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width='wide'
          id="sidebar-menu"

        >
          <Menu.Item className="menu-item" as='a' onClick={() => setVisible(false)}>
            <Icon name='close' />
              Close
            </Menu.Item>
          <Menu.Item className="menu-item" as={Link} to={'/search/category/Shirts'} onClick={() => setVisible(false)}>
            <Image centered circular size="tiny" src="/images/category/shirt.jpg" ></Image>
              SHIRTS
            </Menu.Item>
          <Menu.Item className="menu-item" as={Link} to={'/search/category/Hoodies'} onClick={() => setVisible(false)}>
            <Image centered circular size="tiny" src="/images/category/sweater.jpg"></Image>
              SWEATERS/HOODIES
            </Menu.Item>
          <Menu.Item className="menu-item" as={Link} to={'/search/category/Jackets'} onClick={() => setVisible(false)}>
            <Image centered circular size="tiny" src="/images/category/jacket.jpg"></Image>
              COATS/JACKETS
            </Menu.Item>
          <Menu.Item className="menu-item" as={Link} to={'/search/category/Costumes'} onClick={() => setVisible(false)}>
            <Image centered circular size="tiny" src="/images/category/costume.jpg"></Image>
              COSTUMES
            </Menu.Item>
          <Menu.Item className="menu-item" as={Link} to={'/search/category/Accessory'} onClick={() => setVisible(false)}>
            <Image centered circular size="tiny" src="/images/category/accessory.jpg"></Image>
              ACCESSORIES
            </Menu.Item>

        </Sidebar>

        <Sidebar.Pusher className="pushable-segment" dimmed={visible}>
          <Segment className="pushable-segment" basic padded={false} >

            <div className="grid-container">

              <header className="header">
                <div className="brand">
                  <button onClick={() => setVisible(true)}>&#9776;</button>
                  <Link to="/">PUPSON'S BAY</Link>

                </div>
                <div><SearchField
                  placeholder='Search item'
                  onSearchClick={onSearchClickHandler}
                  onEnter={onSearchClickHandler}
                />
                </div>
                <div className="header-links">
                  <Link to="/cart">
                    <Icon link name="shopping bag" ><span id='cart-length'>{cartItems.length}</span></Icon>
                  </Link>
                  {userInfo ? (
                    <Link to='/profile'>{userInfo.name}</Link>

                  ) : (
                      <Link to="/login">Login</Link>
                    )}
                  {userInfo && userInfo.isContentManager && (
                    <>
                      <Dropdown
                        className="header-dropdown"
                        text="Manage"

                      >
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to='/orders'>Orders</Dropdown.Item>
                          <Dropdown.Item as={Link} to='/products'>Products</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown></>
                  )

                  }

                  {userInfo ? (<Link to="/" onClick={logoutHandler}>Logout</Link>) : (<></>)}

                </div>


              </header>

              <main className="main">
                <div className="content">


                  <Route path="/order/:id" component={OrderScreen}></Route>
                  <Route path="/payment" component={PaymentScreen} />
                  <Route path="/placeorder" component={PlaceOrderScreen} />
                  <Route path="/shipping" component={ShippingScreen} />

                  <PrivateRoute path="/myOrders" component={MyOrdersScreen}></PrivateRoute>



                  <AdminRoute path="/products" component={ProductsScreen} />
                  <AdminRoute path="/orders" component={OrdersScreen} />



                  <Route path="/createAccount" component={CreateAccountScreen} />
                  <Route path="/login" component={LoginScreen} />


                  <PrivateRoute path="/profile" component={ProfileScreen} />


                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route path="/" exact={true} component={HomeScreen} />
                  <Route
                    path="/search/category/:category/color/:color/brand/:brand/keyword/:keyword/order/:order/min/:min/max/:max/rate/:rate/page/:page"
                    component={SearchScreen}
                  />
                  <Route
                    path="/search/keyword/:keyword?"
                    component={SearchScreen}
                    exact
                  />
                  <Route
                    path="/search/category/:category?"
                    component={SearchScreen}
                    exact
                  />
                  <Route
                    path="/search/color/:color?"
                    component={SearchScreen}
                    exact
                  />
                  <Route
                    path="/search/brand/:brand?"
                    component={SearchScreen}
                    exact
                  />






                  <Route path="/search" component={SearchScreen} exact />

                  <Route path="/faq" component={FaqScreen} />
                  <Route path="/shippingReturns" component={ShippingReturnsScreen} />
                  <Route path="/aboutUs" component={AboutUsScreen} />
                  <Route path="/contactLocation" component={ContactLocationScreen} />


                </div>
              </main>

              <div id="footer">
                <div></div>
                <div className="newsletter-section">
                  <div className="newsletter-email">
                    <Form >  <div id="subscribe"><Icon size={'large'} name='mail' /> SUBSCRIBE TO OUR NEWSLETTER</div>
                      <Form.Input inline className="subscribe-input" placeholder="Enter email address" type="email" name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)}>
                      </Form.Input>
                      <div id="subscribe-submit"><Button color={'black'} size={'small'} icon>
                        <Icon name='send' />
                      </Button> </div>

                    </Form>
                  </div>

                </div>

                <Grid centered stackable padded columns={3}>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <div className='centered-footer'>
                        <h3>Hours</h3>
                        <List class="ui list footer" items={['Monday: 9:00 AM - 5:00PM',
                          'Tuesday: 9:00 AM - 5:00PM',
                          'Wednesday: 9:00 AM - 5:00PM',
                          'Thursday: 9:00 AM - 5:00PM',
                          'Friday: 9:00 AM - 5:00PM',
                          'Saturday: 9:00 AM - 4:00PM',
                          'Sunday: Closed']} />
                      </div>

                    </Grid.Column>
                    <Grid.Column width={3}>

                      <div className='centered-footer'>
                        <h3>Service</h3>
                        <div role="list" class="ui list footer">
                          <div role="listitem" class="item"><Link to='/profile' className="link">Account</Link></div>
                          <div role="listitem" class="item"><Link to="/shippingReturns" className="link">Shipping & Returns</Link></div>
                          <div role="listitem" class="item"><Link to="/myOrders" className="link">My Orders</Link></div>
                        </div>


                      </div>

                    </Grid.Column>
                    <Grid.Column width={3}>
                      <div className='centered-footer'>
                        <h3>PUPSON'S BAY</h3>
                        <div role="list" class="ui list footer">
                          <div role="listitem" class="item"><Link to="/aboutUs" className="link">About us</Link></div>
                          <div role="listitem" class="item"><Link to="/contactLocation" className="link">Contact & Location</Link></div>
                          <div role="listitem" class="item"><Link to="/faq" className="link">FAQ</Link></div>
                        </div>
                      </div>
                    </Grid.Column>



                  </Grid.Row>
                  <Grid.Row>
                    <div class="ui labeled icon  menu">
                      <a class="item" >
                        <i class="facebook icon"></i>
                      </a>
                      <a class="item">
                        <i class="instagram icon"></i>
                      </a>
                      <a class="item">
                        <i class="twitter icon"></i>
                      </a>

                    </div>
                  </Grid.Row>
                  <Grid.Row>
                    <p id="lastElementFooter"><Link to="/termAndConditions" className="link">Terms and conditions</Link> | <Link to="/privacyPolicy" className="link">Privacy Policy</Link> | &#169; 2020 PUPSON'S BAY</p>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>








    </BrowserRouter>

  );
}



export default App;
