import { useState } from 'react'
import HardwareItem from './HardwareItem'
import Pagination from './Pagination'

const HardwareSection = ({ 
  onGridMouseEnter, 
  onGridMouseLeave, 
  showArrow 
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const productData = [
    ['Dev Board', 'GPU Cluster', 'Edge Node', 'Sensor Hub', 'FPGA Card', 'Network SW', 'Storage', 'Compute'],
    ['Proto PCB', 'TPU Array', 'Gateway', 'IoT Device', 'ASIC Chip', 'Router HW', 'NVMe Array', 'Server'],
    ['Debug Kit', 'AI Accel', 'Bridge Dev', 'Actuator', 'SoC Module', 'Switch', 'SAN Unit', 'Blade'],
    ['Test Rig', 'Tensor Core', 'Mesh Node', 'Controller', 'DSP Board', 'Firewall', 'RAID Box', 'Rack Unit'],
    ['Eval Board', 'Neural Eng', 'AP Device', 'Interface', 'MCU Board', 'Load Bal', 'NAS Device', 'Node'],
    ['Reference', 'Vector Proc', 'Repeater', 'Telemetry', 'RISC-V', 'SDN Switch', 'DAS Unit', 'Cluster']
  ]

  const products = productData[currentPage - 1]

  return (
    <section className="hardware-section" aria-label="Hardware products">
      <header className="section-header">
        <h2 className="section-title" id="hardware-title">
          {showArrow ? 'HARDWARE [8] ↓' : 'HARDWARE [8]'}
        </h2>
      </header>
      <div 
        className="product-grid" 
        id="hardware-grid" 
        role="grid"
        onMouseEnter={onGridMouseEnter}
        onMouseLeave={onGridMouseLeave}
      >
        {products.map((product, index) => (
          <HardwareItem key={index} product={product} />
        ))}
      </div>
      <nav className="pagination" aria-label="Hardware pagination">
        <Pagination 
          currentPage={currentPage}
          totalPages={6}
          onPageChange={setCurrentPage}
        />
      </nav>
    </section>
  )
}

export default HardwareSection