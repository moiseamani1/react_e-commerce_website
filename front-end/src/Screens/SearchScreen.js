import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, listProductCategories, listProductColors, listProductBrands } from '../Actions/productActions';
import { addToCart } from '../Actions/cartActions';

import { prices, ratings } from '../utils';

import { Dimmer, Grid, Label, List, Loader, Button } from 'semantic-ui-react';
import { Rating } from 'semantic-ui-react'

function SearchScreen(props) {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    categories,
    error: errorCategories,
    loading: loadingCategories,
  } = productCategoryList;

  const productColorList = useSelector((state) => state.productColorList);
  const {
    colors,
    error: errorColors,
    loading: loadingColors,
  } = productColorList;


  const productBrandList = useSelector((state) => state.productBrandList);
  const {
    brands,
    error: errorBrands,
    loading: loadingBrands,
  } = productBrandList;









  const productList = useSelector((state) => state.productList);

  const { products, loading, error, numProducts } = productList;

  const {
    category = 'all',
    color = 'all',
    brand = 'all',
    keyword = 'all',
    order = 'newest',
    min = 0,
    max = 1000000,
    rate = 0,
    page = 1
  } = useParams();



  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState('')

  useEffect(() => {
    // console.log('Products here:'+products)
    dispatch(

      listProducts({
        order,
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        brand: brand !== 'all' ? brand : '',
        keyword: keyword !== 'all' ? keyword : '',
        min,
        max,
        rate,
        page: page,


      }),
      dispatch(listProductCategories()),
      dispatch(listProductColors()),
      dispatch(listProductBrands())
    );

    return () => {
      //
    };
  }, [category, color, brand, order, min, max, rate, dispatch, keyword, page]);

  const showCartAddHandler = (product) => {
    setVisible(product._id)

  }
  const removeCartAddHandler = () => {
    setVisible('')
  }
  const quickAddHandler = (productId, inventory) => {
    if (inventory > 0) {
      dispatch(addToCart(productId, 1, true));
    }

  }

  const paginationChangeHandler = () => {

    props.history.push(getFilterUrl({ page: Number(page) + 1 }))

  }



  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterColor = filter.color || color;
    const filterBrand = filter.brand || brand;
    const filterKeyword = filter.keyword || keyword;
    const filterOrder = filter.order || order;

    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max || max;
    const filterRate = filter.rate || rate;
    const filterPage = filter.page || page;

    return `/search/category/${filterCategory}/color/${filterColor}/brand/${filterBrand}/keyword/${filterKeyword}/order/${filterOrder}/min/${filterMin}/max/${filterMax}/rate/${filterRate}/page/${filterPage}`;
  };

  return (
    <div>
      <div className="row-filter">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (

              <div>


                {products.length} Results out of {numProducts}
                {category !== 'all' && ` : ${category}`}
                {color !== 'all' && ` : ${color}`}
                {brand !== 'all' && ` : ${brand}`}
                {keyword !== 'all' && ` : ${keyword}`}
                {rate > 0 && ` : ${rate} Stars & Up`}
                {min !== 0 && ` : $${min} to $${max}`}
                {category !== 'all' || keyword !== 'all' || rate > 0 || min ? (
                  <>
                    &nbsp;
                    <button
                      type="button"
                      className="small ui grey button"
                      onClick={() => props.history.push('/search')}
                    >
                      Remove Filter
                </button>
                  </>
                ) : null}
              </div>
            )}

        <div>
          Sort By:{' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(
                getFilterUrl({
                  order: e.target.value,
                })
              );
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>

      </div>

      <Grid stackable columns='equal' celled="internally">
        <Grid.Row>

          <Grid.Column width={2}>
            <div className="col-1">
              <div className="filtering-sections">
                <h3>Category</h3>
                <List>
                  {loadingCategories ? (
                    <li>Loading...</li>
                  ) : errorCategories ? (
                    <p>{errorCategories}</p>
                  ) : (
                        categories.map((c) => (
                          <List.Item key={c}>
                            <Link
                              className={c === category ? 'active' : ''}
                              to={getFilterUrl({ category: c })}
                            >
                              {c}
                            </Link>{' '}
                          </List.Item>
                        ))
                      )}
                </List>
              </div>
              <div className="filtering-sections">
                <h3>Brand</h3>
                <List>
                  {loadingBrands ? (
                    <li>Loading...</li>
                  ) : errorBrands ? (
                    <p>{errorBrands}</p>
                  ) : (
                        brands.map((b) => (
                          <List.Item key={b}>
                            <Link
                              className={b === brand ? 'active' : ''}
                              to={getFilterUrl({ brand: b })}
                            >
                              {b}
                            </Link>{' '}
                          </List.Item>
                        ))
                      )}
                </List>
              </div>



              <div className="filtering-sections">
                <h3>Color</h3>
                <List>
                  {loadingColors ? (
                    <li>Loading...</li>
                  ) : errorColors ? (
                    <p>{errorColors}</p>
                  ) : (
                        colors.map((c) => (
                          <List.Item key={c}>
                            {/* <Link
                          className={c === color ? 'active' : ''}
                          to={getFilterUrl({ color: c })}
                        > */}

                            <Label color={c} as={Link} to={getFilterUrl({ color: c })}>
                              {c.toUpperCase()}
                            </Label>


                            {/* </Link> */}
                            {' '}
                          </List.Item>
                        ))
                      )}
                </List>
              </div>







              <div className="filtering-sections">
                <h3>Price</h3>
                <List>
                  {prices.map((x) => (
                    <List.Item key={x.name}>
                      <Link
                        className={
                          `${x.min}-${x.max}` === `${min}-${max}` ? 'active' : ''
                        }
                        to={getFilterUrl({ min: x.min, max: x.max })}
                      >
                        {x.name}
                      </Link>
                    </List.Item>
                  ))}
                </List>
              </div>
              <div className="filtering-sections">
                <h3>Avg. Customer Review</h3>

                {/* {ratings.map((x) => (
                <li key={x.rate}>
                  <Link
                    className={`${x.rate}` === rate ? 'active' : ''}
                    to={getFilterUrl({
                      rate: x.rate,
                    })}
                  >
                    <Rating value={x.rate}  />
                  </Link>
                </li>
              ))} */}
                <List>
                  <List.Item as={Link} to={getFilterUrl({ rate: 1 })}><Rating disabled icon='star' defaultRating={1} maxRating={5} /><span> & Up</span></List.Item>
                  <List.Item as={Link} to={getFilterUrl({ rate: 2 })}><Rating disabled icon='star' defaultRating={2} maxRating={5} /><span> & Up</span></List.Item>
                  <List.Item as={Link} to={getFilterUrl({ rate: 3 })}><Rating disabled icon='star' defaultRating={3} maxRating={5} /><span> & Up</span></List.Item>
                  <List.Item as={Link} to={getFilterUrl({ rate: 4 })}><Rating disabled icon='star' defaultRating={4} maxRating={5} /><span> & Up</span></List.Item>
                  <List.Item as={Link} to={getFilterUrl({ rate: 5 })}><Rating disabled icon='star' defaultRating={5} maxRating={5} /><span> & Up</span></List.Item>
                </List>






              </div>
            </div>

          </Grid.Column>
          <Grid.Column >
            <div className="col-3">
              {loading ? (
                <Dimmer active inverted>
                  <Loader size='huge'>Loading</Loader>
                </Dimmer>
              ) : error ? (
                <p>{error}</p>
              ) : (
                    <div className="row center">
                      {products.length === 0 && (
                        <p>No Product Found</p>
                      )}
                      <ul class="products">
                        {products.map(product =>
                          <li key={product._id}>
                            <div className="product"
                              onMouseEnter={() => showCartAddHandler(product)} onMouseLeave={() => removeCartAddHandler()}
                            >
                              <img class="product-image" src={product.image} alt="product"></img>
                              <div className="product-name"><Link to={'/product/' + product._id}>{product.name}</Link></div>
                              <div className="product-brand">{product.brand}</div>
                              <div className="product-price">${product.price}</div>
                              <div className="product-rating">{product.rating} Stars({product.numReviews} Reviews)</div>
                              {visible === product._id ? <button id="product-button" onClick={() => quickAddHandler(product._id, product.inventory)} className="ui black button full-width">Add to cart</button> : <p></p>}
                            </div>

                          </li>)
                        }
                      </ul>
                      <div className="pagination-menu">
                        {products.length !== numProducts && <Button onClick={paginationChangeHandler}> Load more</Button>}
                        {/* <Pagination 
 boundaryRange={0}

 ellipsisItem={null}
 firstItem={null}
 lastItem={null}
 siblingRange={1}
 activePage={page}

defaultActivePage={page} totalPages={10}
onPageChange={paginationChangeHandler} /> */}

                      </div>

                      {/* to={getFilterUrl({ min: x.min, max: x.max })} */}

                    </div>
                  )}
            </div>
          </Grid.Column>
        </Grid.Row>


      </Grid>

    </div>
  );
}

export default SearchScreen;

