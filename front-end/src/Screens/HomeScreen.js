import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listProductFeatured } from '../Actions/productActions'
import { Button, Container, Dimmer, Grid, Image, Loader } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Popular from '../Components/popular';
import Featured from '../Components/featured';

function HomeScreen(props) {
  const productFeaturedList = useSelector((state) => state.productFeaturedList);
  const {
    featured,
    error: errorFeatured,
    loading: loadingFeatured,
  } = productFeaturedList;

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState('')
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listProductFeatured());
    return () => {

    };
  }, []);
  return loading ? <Dimmer active inverted>
    <Loader size='huge'>Loading</Loader>
  </Dimmer> :
    error ? <div>{error}</div> :
      <div>
        <Carousel infiniteLoop showArrows showStatus={false} autoPlay={true} showThumbs={false}>

          <div className="carousel-container">
            <img className=" carousel" src="/images/banner/sale.png" />
          </div>
          <div className="carousel-container">
            <img className="carousel" src="/images/banner/halloween.png" />

          </div>
          <div className='carousel-container'>
            <img className=" carousel" src="/images/banner/winter.png" />
          </div>
        </Carousel>
        <Image centered src="/images/home_art/homeart1.jpg" size='massive' />
        <div className="accessory-arrivals">
          <Button color='black' size='big'>
            Shop our new arrivals for accessories
    </Button>
        </div>
        <Grid centered columns={1}>
          <Grid.Row>
            <h1>Featured Products</h1>
          </Grid.Row>
        </Grid>
        {loadingFeatured ? (
          <p>Loading...</p>
        ) : errorFeatured ? (
          <p >{errorFeatured}</p>
        ) : (<div className="featured-products">  {featured.length === 0 && <p>No Featured Product Found</p>}

          <ul className="products">{featured.map((product) => (<Featured key={product._id} product={product} />))}</ul>
        </div>)
        }
        <Grid centered columns={1}>
          <Grid.Row>
            <h1>Our Popular Brands</h1>
          </Grid.Row>
        </Grid>
        <Popular></Popular>
      </div>

}

export default HomeScreen;