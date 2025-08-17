const HardwareItem = ({ product }) => {
  // Generate unique gradient for each item
  const color1 = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  const color2 = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  const gradientStyle = {
    background: `linear-gradient(135deg, #${color1}33, #${color2}33)`
  }

  return (
    <div className="hardware-item" role="gridcell">
      <div className="hardware-img" style={gradientStyle}></div>
    </div>
  )
}

export default HardwareItem