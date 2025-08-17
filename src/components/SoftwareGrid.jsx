import React, { useEffect, useRef } from 'react';

const receiptItems = [
  { name: 'Software product 1', code: 'abcd1', price: 0 },
  { name: 'Software product 2', code: 'abcd2', price: 0 },
  { name: 'Software support 2', code: 'abcs2s', price: 0 },
  { name: 'Hardware product 1', code: 'hijk', price: 0 }
];

const SoftwareGrid = ({ items }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const wide = grid.querySelector('.software-item-wide');
    if (wide) {
      wide.style.position = 'absolute';
      wide.style.top = '0';
      wide.style.right = '0';
      wide.style.width = 'calc((100% - 84px) / 4 + 12px)';
      wide.style.height = 'calc(100vh - 430px)';
    }
  }, [items]);

  return (
    <div className="product-grid" id="software-grid" role="grid" ref={gridRef}>
      {items.slice(0,6).map((item, i) => (
        <div key={i} className="software-item" role="gridcell" onMouseEnter={()=>item && window.__showTopic && window.__showTopic(item)} onMouseLeave={()=>item && window.__scheduleHide && window.__scheduleHide()}>
          {item || ''}
        </div>
      ))}
      <div className="software-item-wide shopping-cart" role="gridcell">
        <div className="receipt-content">
          <div className="receipt-header">SHOPPING CART</div>
          <div className="receipt-items">
            {receiptItems.map((line, idx) => (
              <div className="receipt-line" key={idx}>
                <span className="item-name">{line.name}</span>
                <span className="item-price">₹{line.price}</span>
              </div>
            ))}
          </div>
          <div className="receipt-subtotal">
            <span>SUBTOTAL (0 items):</span>
            <span>₹0</span>
          </div>
          <div className="receipt-shipping">
              <span>SHIPPING (free &gt;2):</span>
            <span>₹99</span>
          </div>
          <div className="receipt-total">
            <span>TOTAL:</span>
            <span>₹99</span>
          </div>
          <button className="checkout-btn">=== checkout ===</button>
        </div>
      </div>
    </div>
  );
};

export default SoftwareGrid;
