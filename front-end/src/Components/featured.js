import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';


export default function Featured(props) {
  const { product } = props;
  return (
<List.Item className="featured-item"key={product._id} as={Link} to={'/product/' + product._id}>
    <img class="product-image" src={product.image} alt="product"></img>
                        <div className="product-name"><Link to={'/product/' + product._id}>{product.name}</Link></div>
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-price">${product.price}</div>
                        
</List.Item>);
}