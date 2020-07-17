import React, { Component } from 'react';
import Products from './components/products/Products';
import './App.css';
import data from './data.json';
import Filter from './components/products/Filter';
import Cart from './components/cart/Cart';

class App extends Component {
  constructor() {
    super ();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      size: "",
      sort: ""
    }
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false

    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true
        console.log(item)
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

  filterProducts = size => {
    // @filter based on size
    if (size === "") {
      console.log("size is not changed");
      this.setState({
        size: size,
        products: data.products
      });
    } else {
      console.log("size is changed", size);
      this.setState({
        size: size,
        products: data.products.filter(product => product.availableSizes.indexOf(size) >= 0)
      });
    }
  }

  sortProducts = sort => {
    // @sort based on prices
    console.log(sort);
    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => 
        sort === "lowest" ?
        a.price > b.price
          ? 1
          : -1
        : sort === "highest" 
          ? a.price < b.price
            ? 1
            : -1
          : a._id < b._id
            ? 1
            : -1
      )
    });
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
            <Filter
             count={this.state.products.length}
             size={this.state.size} 
             sort={this.state.sort}
             filterProducts={this.filterProducts}
             sortProducts={this.sortProducts} 
             />
            <Products
             products={this.state.products}
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