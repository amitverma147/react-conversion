const SoftwareItem = ({ product, onMouseEnter, onMouseLeave }) => {
  if (product.trim() === '') {
    return <div className="software-item" style={{ visibility: 'hidden' }} role="gridcell" />
  }

  return (
    <div 
      className="software-item" 
      role="gridcell"
      onMouseEnter={() => onMouseEnter && onMouseEnter(product)}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
    >
      {product}
    </div>
  )
}

export default SoftwareItem