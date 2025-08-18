import { useState, useEffect } from 'react'
import SoftwareItem from './SoftwareItem'
import ShoppingCart from './ShoppingCart'
import Pagination from './Pagination'

const SoftwareSection = ({ 
  onItemMouseEnter, 
  onItemMouseLeave, 
  onGridMouseEnter, 
  onGridMouseLeave, 
  showArrow 
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const productData = [
    ['API Gateway', 'Auth Service', 'Data Pipeline', 'ML Platform', 'CI/CD Tools', 'Monitoring', '', ''],
    ['GraphQL API', 'Microservice', 'ETL Engine', 'Analytics', 'Deploy Agent', 'Log Parser', '', ''],
    ['REST Server', 'OAuth2 Proxy', 'Stream Proc', 'AI Engine', 'Build System', 'Metrics Hub', '', ''],
    ['gRPC Service', 'JWT Handler', 'Batch Jobs', 'Model Server', 'Test Runner', 'Alert Mgr', '', ''],
    ['WebSocket', 'SAML Bridge', 'Data Lake', 'Inference', 'Package Mgr', 'Trace Agent', '', '']
  ]

  const products = productData[currentPage - 1]

  return (
    <section className="software-section" aria-label="Software products">
      <header className="section-header">
        <h2 className="section-title" id="software-title">
          {showArrow ? '↑ SOFTWARE [7]' : 'SOFTWARE [7]'}
        </h2>
      </header>
      <nav className="pagination" aria-label="Software pagination">
        <Pagination 
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </nav>
      <div 
        className="product-grid software-grid" 
        id="software-grid" 
        role="grid"
        onMouseEnter={onGridMouseEnter}
        onMouseLeave={onGridMouseLeave}
      >
        {/* Render first 6 items normally */}
        {products.slice(0, 6).map((product, index) => (
          <SoftwareItem 
            key={index} 
            product={product} 
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
          />
        ))}
        
        {/* Shopping cart positioned absolutely on the right - desktop only */}
        {isDesktop && <ShoppingCart />}
      </div>
    </section>
  )
}

export default SoftwareSection