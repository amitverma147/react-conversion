import { useState } from 'react'
import HighlightTerm from './HighlightTerm'
import QuestionsContainer from './QuestionsContainer'

const MiddleSection = ({ 
  showQuestions, 
  questions, 
  currentTopic,
  onQuestionsMouseEnter,
  onQuestionsMouseLeave 
}) => {
  const [activeDescription, setActiveDescription] = useState('')

  return (
    <section className="middle-section" aria-label="Product descriptions">
      <div className="main-content-container">
        <h1 className="product-heading">
          SOFTWARE <span className="divider">/</span> HARDWARE
        </h1>
        <div className="company-description">
          Engineering <HighlightTerm text="high-performance" tooltip="99.999% uptime SLA" /> systems at the intersection of software and hardware.<br />
          We build <HighlightTerm text="mission-critical" tooltip="Zero-downtime architecture" /> infrastructure for enterprises requiring absolute reliability.<br />
          Our solutions power <HighlightTerm text="global-scale" tooltip="10M+ concurrent users" /> deployments across 47 countries.
        </div>
        <div className="product-specific-description">
          <div className={`description-text ${activeDescription === 'software' ? 'active' : ''}`} id="software-desc">
            Our <HighlightTerm text="cloud-native" tooltip="Kubernetes-ready microservices" /> software leverages <HighlightTerm text="AI/ML" tooltip="TensorFlow & PyTorch models" /> for <HighlightTerm text="real-time" tooltip="Sub-millisecond latency" /> processing.<br />
            Built with <HighlightTerm text="scalable" tooltip="Horizontal auto-scaling" /> architectures and <HighlightTerm text="containerized" tooltip="Docker & orchestration" /> deployments for maximum efficiency.
          </div>
          <div className={`description-text ${activeDescription === 'hardware' ? 'active' : ''}`} id="hardware-desc">
            Engineered <HighlightTerm text="SoC" tooltip="System-on-Chip design" /> hardware featuring <HighlightTerm text="FPGA" tooltip="Field-programmable arrays" /> acceleration and <HighlightTerm text="edge computing" tooltip="On-device processing" />.<br />
            Our <HighlightTerm text="IoT-enabled" tooltip="MQTT & LoRaWAN protocols" /> devices support <HighlightTerm text="real-time OS" tooltip="FreeRTOS & Zephyr" /> for critical applications.
          </div>
        </div>
      </div>

      <QuestionsContainer 
        show={showQuestions} 
        questions={questions}
        topic={currentTopic}
        onMouseEnter={onQuestionsMouseEnter}
        onMouseLeave={onQuestionsMouseLeave}
      />
    </section>
  )
}

export default MiddleSection