import React from 'react';

const Filter = props => {
  return (
    <div className="filter">
      <div className="filter-result">{props.count} Products</div>
      <div className="filter-sort">
        Order {" "}
         <select name="sort" id="sort" value={props.sort} onChange={(e) => props.sortProducts(e.target.value)}>
           <option>Latest</option>
           <option value="lowest">Lowest</option>
           <option value="highest">Highest</option>
         </select>
      </div>
      <div className="filter-size">
        Filter {" "}
        <select name="size" id="size" value={props.size} onChange={e => props.filterProducts(e.target.value)}>
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