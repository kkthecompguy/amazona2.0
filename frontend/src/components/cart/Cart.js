import React, { useState } from 'react';
import { formatCurrency } from '../../utils/FormatCurr';
import Fade from 'react-reveal/Fade';

const Cart = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [showCheckout, setShowCheckout] = useState(false)
  

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const createOrder = e => {
    e.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems
    }
    props.createOrder(order);
  }

  const { cartItems } = props;
  const { name, email, address } = formData;
  
  return (
    <div>
      { cartItems.length === 0 ? 
        <div className="cart cart-header">Cart is empty</div> :
        <div className="cart cart-header">
          You have {cartItems.length} in the cart {" "}
        </div>
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
                    <button onClick={() => props.removeFromCart(item)} className="button">Remove</button>
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
                    <form onSubmit={e => createOrder(e)}>
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