import React from 'react';

const ProductGrid = ({ items, type }) => {
  return (
    <div className="product-grid" role="grid" id={`${type}-grid`}>
      {items.map((item, index) => (
        item && (
          <div 
            key={`${type}-${index}`} 
            className="product-item" 
            role="gridcell"
          >
            {item}
          </div>
        )
      ))}
    </div>
  );
};

export default ProductGrid;
