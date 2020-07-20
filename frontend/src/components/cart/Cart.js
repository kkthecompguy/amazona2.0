import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/FormatCurr';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { removeFromCart, createOrder, clearOrder } from '../../actions/cart';

const Cart = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const {cartItems, order} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleCreateOrder = e => {
    e.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems,
      total: cartItems.reduce((a, c) => a + (c.price * c.count), 0)
    }
    dispatch(createOrder(order));
  }

  const closeModal = () => {
    dispatch(clearOrder())
  }

  const { name, email, address } = formData;
  
  return (
    <div>
      { cartItems.length === 0 ? 
        <div className="cart cart-header">Cart is empty</div> :
        <div className="cart cart-header">
          You have {cartItems.length} in the cart {" "}
        </div>
      }

      {
        order && (
          <Modal isOpen={true} ariaHideApp={false} onRequestClose={() => closeModal()}>
            <Zoom>
              <button onClick={() => closeModal()} className="close-modal">x</button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed</h3>
                <h2>Order #{order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{order.total}</div>
                  </li>
                  <li>
                    <div>Cart:</div>
                    <div>{order.cartItems.map(x => (
                      <div>{x.count} x { x.title }</div>
                    ))}</div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )
      }

      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              { cartItems.map(item => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt="Item"/>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                    {formatCurrency(item.price)} x {item.count} {" "}
                    <button onClick={() => dispatch(removeFromCart(item))} className="button">Remove</button>
                    </div>
                  </div>
                </li>
              )) }
            </ul>
          </Fade>
        </div>
        { cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total: {" "}
                  {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                </div>
                <button onClick={() => setShowCheckout(true)} className="button primary">Proceed</button>
              </div>
            </div>
            {
              showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={e => handleCreateOrder(e)}>
                      <ul className="form-container">
                        <li>
                          <label htmlFor="email">Email</label>
                          <input
                          type="email" 
                          name="email" 
                          id="email"
                          value={email}
                          onChange={e => handleChange(e)}
                          required
                          />
                        </li>
                        <li>
                          <label htmlFor="name">Name</label>
                          <input
                          type="text" 
                          name="name" 
                          id="name"
                          value={name}
                          onChange={e => handleChange(e)}
                          required
                          />
                        </li>
                        <li>
                          <label htmlFor="address">Address</label>
                          <input
                          type="text" 
                          name="address" 
                          id="address"
                          value={address}
                          onChange={e => handleChange(e)}
                          required
                          />
                        </li>
                        <li>
                          <button type="submit" className="button primary">Checkout</button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )
            }
          </div>
        ) }
      </div>
    </div>
  );
}

export default Cart;