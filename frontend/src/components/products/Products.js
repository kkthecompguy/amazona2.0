import React from 'react';
import { formatCurrency } from '../../utils/FormatCurr';

const Products = props => {
  
  return (
    <div>
      <ul className="products">
        {props.products.map(product => (
          <li key={product._id}>
            <div className="product">
              <a href="#!">
                <img src={product.image} alt="Product"/>
                <p>{product.title}</p>
              </a>
              <div className="product-price">
                <div>
                  {formatCurrency(product.price)}
                </div>
                <button className="button primary" >Add To Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;