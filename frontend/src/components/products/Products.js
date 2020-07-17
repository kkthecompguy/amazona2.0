import React, { useState } from 'react';
import { formatCurrency } from '../../utils/FormatCurr';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from  'react-reveal/Zoom';

const Products = props => {
  const [product, setProduct] = useState(null);

  const openModal = product => {
    setProduct(product);
  }

  const closeModal = () => {
    setProduct(null);
  }

  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {props.products.map(product => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt="Product"/>
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>
                    {formatCurrency(product.price)}
                  </div>
                  <button className="button primary" onClick={() => props.addToCart(product)}>Add To Cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {
        product && (
          <Modal isOpen={true} ariaHideApp={false} onRequestClose={() => closeModal()}>
            <Zoom>
              <button onClick={() => closeModal()} className="close-modal">x</button>
              <div className="product-details">
                <img src={product.image} alt="Product"/>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>
                    Available Sizes: {" "} 
                    {product.availableSizes.map((x, index) => (
                      <span key={index}>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>
                      {formatCurrency(product.price)}
                    </div>
                    <button onClick={() => {
                      props.addToCart(product);
                      closeModal()
                      }} className="button primary">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )
      }
    </div>
  );
}

export default Products;