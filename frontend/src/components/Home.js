import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Products from './products/Products';
import Filter from './products/Filter';
import Cart from './cart/Cart';
import { logout } from '../actions/auth';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  
  return (
    <div className="grid-container">
      <header>
        <a href="/">Amazona</a>
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
        <div className="content">
        <div className="main">
          <Filter />
          <Products />
        </div>
        <div className="sidebar">
          <Cart  />
        </div>
    </div>
      </main>
      <footer>
        All right reserved &copy; 2020
      </footer>
    </div>
  ); 
}

export default Home;