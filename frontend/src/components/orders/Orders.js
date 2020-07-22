import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrder } from '../../actions/cart';
import { logout } from '../../actions/auth';
import Loader from 'react-loader-spinner';
import { formatCurrency } from '../../utils/FormatCurr';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';


const Order = () => {
  const [items, setItems] = useState(null);
  const { orders, loading } = useSelector(state => state.cart);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const openModal = cartItems => {
    setItems(cartItems);
  }

  const closeModal = () => {
    setItems(null);
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className="grid-container">
      <header>
        <div>
          <a href="/">Amazona</a>
        </div>
        <div>
          { 
            isAuthenticated ?  
            <Fragment>
              <Link to="/orders" className="header-links">Orders</Link>
              <a href="#!" onClick={() => dispatch(logout())} className="header-links">Logout</a>
              </Fragment>
            :
            <Link to="/signin" className="header-links">Sign In</Link>
          }
        </div>
      </header>
      <main>
        <div className="container">
          <div className="orders">
            <div className="admin">
              { user && (<ul>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Status: {user.status}</li>
              </ul>)}
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order No#</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>shipped</th>
                    <th>Date Ordered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loading ? <tr><td><Loader type="Oval" width={50} height={50} color="#424242" /></td></tr> :
                    orders.map(order => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.name.split(" ")[0]}</td>
                        <td>{order.email}</td>
                        <td><button className="button" onClick={() => openModal(order.cartItems)}>View</button></td>
                        <td>{formatCurrency(order.total)}</td>
                        <td>{order.paid ? "True": "False"}</td>
                        <td>{order.shipped ? "True": "False"}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td><button className="button" onClick={() => dispatch(deleteOrder(order._id))}>Delete</button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {
                items && ( 
                  <Modal isOpen={true} ariaHideApp={false} onRequestClose={() => closeModal()}>
                    <Zoom> 
                      <button onClick={() => closeModal()} className="close-modal">x</button>
                      <div>
                          {items.map(item => (
                            <ul key={item._id} className="orders-item-list">
                              <li>
                                <img src={item.image} alt={item._id}/>
                                <div>
                                  {item.count} x {item.title} @ {item.price}
                                </div>
                              </li>
                            </ul>
                          ))}
                      </div>
                    </Zoom>
                  </Modal> 
                )
              }
            </div>
          </div>
        </div>
      </main>
      <footer>
        All right reserved &copy; 2020
      </footer>
    </div>
  );
}

export default Order;