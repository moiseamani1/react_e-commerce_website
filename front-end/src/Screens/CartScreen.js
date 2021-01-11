import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../Actions/cartActions';
import { Divider, Grid, } from 'semantic-ui-react';

function CartScreen(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();


    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));

    }
    const checkoutHandler = () => {
        props.history.push("/login?redirect=shipping")
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }



    }, [dispatch, productId, quantity]);


    return <div className='ui container cart'>
        <Grid stackable centered columns={2}>
            <Grid.Column width={8}>
                <div className='cart-list'>
                    <ul className="cart-list-container">
                        <li>
                            <h3> Shopping Cart</h3>
                            <h3> Price</h3>
                        </li>

                        {
                            cartItems.length === 0 ?
                                <div>Cart is empty</div> :
                                cartItems.map(item =>
                                    <div>
                                        <Grid columns={3}>
                                            <Grid.Column><img className="cart-image" src={item.image} alt={item.name} /></Grid.Column>
                                            <Grid.Column>
                                                <div className='cart-brand'>
                                                    {item.brand}
                                                </div>
                                                <div className='cart-name'>
                                                    <Link to={"/product/" + item.product}>{item.name}</Link>
                                                </div>
                                                <div className='cart-quantity'>
                                                    Quantity:
                                    <select value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                        {[...Array(item.inventory).keys()].map(x =>
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )}
                                                    </select>

                                                </div>

                                            </Grid.Column>

                                            <Grid.Column>
                                                <div className='cart-price'>
                                                    ${item.price}
                                                    <button id="cart-delete" type="button" className="ui button red" onClick={() => removeFromCartHandler(item.product)}>
                                                        X
                                        </button>
                                                </div></Grid.Column>










                                        </Grid>
                                        <Divider></Divider>
                                    </div>


                                )

                        }

                    </ul>

                </div>

            </Grid.Column>
            <Grid.Column width={4}>
                <div className='cart-action'>
                    <h3>Order Summary</h3>
                    <Divider></Divider>
                    <h4>Subtotal ( {cartItems.reduce((a, c) => a + parseInt(c.quantity), 0)} items)
:${cartItems.reduce((a, c) => a + c.price * parseInt(c.quantity), 0)}
                    </h4>
                    <button onClick={checkoutHandler} class="ui teal button full-width" disabled={cartItems.length === 0}>

                        Proceed to checkout
</button>
                </div>

            </Grid.Column>
        </Grid>


    </div>
}

export default CartScreen;