import { useState, useEffect } from 'react'
import './App.css'
import SoftwareSection from './components/SoftwareSection'
import MiddleSection from './components/MiddleSection'
import HardwareSection from './components/HardwareSection'
import SideText from './components/SideText'
import ThemeToggle from './components/ThemeToggle'
import ULPanel from './components/ULPanel/ULPanel'
import { useHoverSystem } from './hooks/useHoverSystem'

function App() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [currentFont, setCurrentFont] = useState(0)
  
  const {
    showQuestions,
    currentTopic,
    questions,
    showSoftwareArrow,
    showHardwareArrow,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleQuestionsMouseEnter,
    handleQuestionsMouseLeave,
    handleSoftwareGridEnter,
    handleSoftwareGridLeave,
    handleHardwareGridEnter,
    handleHardwareGridLeave
  } = useHoverSystem()

  const fonts = ['font-mono', 'font-serif', 'font-sans', 'font-condensed', 'font-terminal', 'font-display']
  const themes = Array.from({length: 100}, (_, i) => `theme-${i}`)

  // Load saved theme and font
  useEffect(() => {
    const savedTheme = parseInt(localStorage.getItem('currentTheme')) || 0
    const savedFont = parseInt(localStorage.getItem('currentFont')) || 0
    
    setCurrentTheme(savedTheme)
    setCurrentFont(savedFont)
  }, [])

  // Apply theme and font classes to body
  useEffect(() => {
    document.body.className = `${themes[currentTheme]} ${fonts[currentFont]}`
  }, [currentTheme, currentFont, themes, fonts])

  const toggleTheme = () => {
    const newTheme = (currentTheme + 1) % themes.length
    const newFont = (currentFont + 1) % fonts.length
    
    setCurrentTheme(newTheme)
    setCurrentFont(newFont)
    
    localStorage.setItem('currentTheme', newTheme)
    localStorage.setItem('currentFont', newFont)
  }

  return (
    <>
      <SideText />
      <main className="main-content">
        <ThemeToggle currentTheme={currentTheme} onToggle={toggleTheme} />
        <ULPanel />
        <SoftwareSection 
          onItemMouseEnter={handleItemMouseEnter}
          onItemMouseLeave={handleItemMouseLeave}
          onGridMouseEnter={handleSoftwareGridEnter}
          onGridMouseLeave={handleSoftwareGridLeave}
          showArrow={showSoftwareArrow}
        />
        <MiddleSection 
          showQuestions={showQuestions}
          questions={questions}
          currentTopic={currentTopic}
          onQuestionsMouseEnter={handleQuestionsMouseEnter}
          onQuestionsMouseLeave={handleQuestionsMouseLeave}
        />
        <HardwareSection 
          onGridMouseEnter={handleHardwareGridEnter}
          onGridMouseLeave={handleHardwareGridLeave}
          showArrow={showHardwareArrow}
        />
      </main>
    </>
  )
}

export default App