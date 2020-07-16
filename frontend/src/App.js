import React, { useState } from 'react';
import Products from './components/products/Products';
import './App.css';
import data from './data.json';
import Filter from './components/products/Filter';

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const filterProducts = size => {
    // @filter based on size
    if (size === "") {
      console.log("size is not changed");
      setSize(size);
      setProducts(data.products);
    } else {
      console.log("size is changed", size);
      setSize(size);
      setProducts(data.products.filter(product => product.availableSizes.indexOf(size) >= 0));
    }
  }

  const sortProducts = sort => {
    // @sort based on prices
    console.log(sort);
    setSort(sort)
    setProducts(products.slice().sort((a, b) => 
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
    ))
  }

  return (
    <div className="grid-container">
      <header>
        <a href="/">Amazona</a>
      </header>
      <main>
        <div className="content">
        <div className="main">
          <Filter
           count={products.length}
           size={size} 
           sort={sort}
           filterProducts={filterProducts}
           sortProducts={sortProducts} 
           />
          <Products products={products} />
        </div>
        <div className="sidebar">
          Carts Items
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
