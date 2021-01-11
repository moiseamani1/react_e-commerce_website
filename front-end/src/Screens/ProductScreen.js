import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../Actions/productActions';
import { Grid, Image, Container, List } from 'semantic-ui-react';

function ProductScreen(props) {
    const [quantity, setQuantity] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(detailsProduct(props.match.params.id));
            return () => {
            }
        }, [dispatch]);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?quantity=" + quantity);
    }


    return <div >

        <div className="ret-to-result">
            <Link onClick={() => { window.history.back() }}> &#x2190; Go Back</Link>
        </div>
        {loading ? <div>Loading..</div> :
            error ? <div>error</div> : (


                <Container>
                    <Grid stackable centered columns={2}>
                        <Grid.Column>
                            <Image src={product.image} className="details-image" alt="product" />
                        </Grid.Column>
                        <Grid.Column>
                            <div className="details-info">
                                <ul>
                                    <li className="brand">{product.brand}</li>
                                    <li className="name">{product.name} </li>
                                    <li className="ratings">{product.rating} Stars ({product.numReviews} Reviews)</li>
                                    <li className="price">${product.price}</li>
                                </ul>
                            </div>


                            <div className="details-proceed">
                                <ul>
                                    <li>
                                        Ref: {product._id}
                                    </li>
                                    <li>
                                        Inventory:{product.inventory > 0 ? <span id="available"> Available</span> : <span id="out-of-stock"> Out of Stock</span>}
                                    </li>
                                    <li>
                                        Quantity: <select value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                                            {[...Array(product.inventory).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                    </li>
                                    <li className="add-to-cart">
                                        {product.inventory > 0 &&
                                            <button className="ui teal  button" onClick={handleAddToCart}>Add to Shopping Cart</button>
                                        }

                                    </li>


                                </ul>

                            </div>
                            <div className="details-description">
                                <div id="details">Details</div>
                                <List bulleted items={[product.description]} />
                            </div>

                        </Grid.Column>

                    </Grid>
                </Container>

                /* <div className="prod-details">
                            <div className="details-image">
                                <img src={product.image} alt='product'></img>
                                <div>Description: <div>{product.description}</div></div>
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li><h4>{product.name} </h4></li>
                                    <li>{product.rating} Stars ({product.numReviews} Reviews)</li>
                                    <li>Price: $<b>{product.price} </b></li>
                                </ul>
                            </div>
                            <div className="details-proceed">
                                <ul>
                                    <li>
                                        Price:{product.price}
                                    </li>
                                    <li>
                                        Inventory:{product.inventory>0?" Item Available":" Out of Stock"}
                                    </li>
                                    <li>
                                        Quantity: <select value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}>
                                            {[...Array(product.inventory).keys()].map(x=>
                                                <option key ={x+1} value={x+1}>{x+1}</option>
                                                )}
                                        </select>
                                    </li>
                                    <li className="add-to-cart">
                                        {product.inventory>0 &&
                                        <button  onClick={handleAddToCart}>Add to Shopping Cart</button>
                                        }
                                        
                                    </li>
                
                
                                </ul>
                
                            </div>
                
                
                        </div> */



            )}

    </div>
}

export default ProductScreen;