import { useState, useEffect } from 'react'
import ShoppingCart from './ShoppingCart'

const ResponsiveNav = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (isCartOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isCartOpen, isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <>
      {/* Mobile Navigation Header */}
      <div className="responsive-nav-header">
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Shopping Cart Toggle */}
        <button 
          className="cart-toggle-btn"
          onClick={toggleCart}
          aria-label="Toggle shopping cart"
        >
          CART
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button 
              className="close-menu-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="mobile-menu-buttons">
            {children}
          </div>
        </div>
      </div>

      {/* Shopping Cart Overlay */}
      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-content" onClick={(e) => e.stopPropagation()}>
          <button 
            className="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
          <ShoppingCart isMobile={true} />
        </div>
      </div>

      {/* Desktop Navigation Buttons */}
      <div className="desktop-nav-buttons">
        {children}
      </div>
    </>
  )
}

export default ResponsiveNav