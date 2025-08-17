const ShoppingCart = () => {
  const items = [
    { name: 'Software product 1', code: 'abcd1', price: 0 },
    { name: 'Software product 2', code: 'abcd2', price: 0 },
    { name: 'Software support 2', code: 'abcs2s', price: 0 },
    { name: 'Hardware product 1', code: 'hijk', price: 0 }
  ]

  const cartStyle = {
    position: 'absolute',
    top: '100px',
    right: '0',
    width: 'calc((100% - 84px) / 4 + 12px)',
    height: 'calc(100vh - 430px)'
  }

  return (
    <div className="software-item-wide shopping-cart " style={cartStyle} role="gridcell">
      <div className="receipt-content">
        <div className="receipt-header">SHOPPING CART</div>
        
        <div className="receipt-items">
          {items.map((item, index) => (
            <div key={index} className="receipt-line">
              <span className="item-name">{item.name}</span>
              <span className="item-price">₹{item.price}</span>
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
  )
}

export default ShoppingCart