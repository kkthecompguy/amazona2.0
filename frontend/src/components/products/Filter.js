import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, sortProducts } from '../../actions/product';

const Filter = () => {
  const {products, size, sort, filtered} = useSelector(state => state.product);
  const dispatch = useDispatch();

  return (
    <div className="filter">
      <div className="filter-result">{products.length} Products</div>
      <div className="filter-sort">
        Order {" "}
         <select name="sort" id="sort" value={sort} onChange={(e) => dispatch(sortProducts(products, e.target.value))}>
           <option>Latest</option>
           <option value="lowest">Lowest</option>
           <option value="highest">Highest</option>
         </select>
      </div>
      <div className="filter-size">
        Filter {" "}
        <select name="size" id="size" value={size} onChange={e => dispatch(filterProducts(filtered, e.target.value))}>
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;