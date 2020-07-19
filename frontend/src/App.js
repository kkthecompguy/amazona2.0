import React, { Component } from 'react';
import Products from './components/products/Products';
import './App.css';
import Filter from './components/products/Filter';
import Cart from './components/cart/Cart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
    }
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false

    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true
      }
    });
    if (!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(item => item._id !== product._id)
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item._id !== product._id)));
  }

  createOrder = order => {
    alert("Need to save order for"+ order.name);
  }

  

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Amazona</a>
        </header>
        <main>
          <div className="content">
          <div className="main">
            <Filter />
            <Products
             addToCart={this.addToCart}
            />
          </div>
          <div className="sidebar">
            <Cart
             cartItems={this.state.cartItems} 
             removeFromCart={this.removeFromCart}
             createOrder={this.createOrder}
            />
          </div>
      </div>
        </main>
        <footer>
          All right reserved &copy; 2020
        </footer>
      </div>
    ); 
  }
}

export default App;