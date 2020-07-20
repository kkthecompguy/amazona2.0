import React from 'react';
import Products from './components/products/Products';
import './App.css';
import Filter from './components/products/Filter';
import Cart from './components/cart/Cart';

const App = () => {

  return (
    <div className="grid-container">
      <header>
        <a href="/">Amazona</a>
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

export default App;