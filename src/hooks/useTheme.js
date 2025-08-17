import { useState, useEffect } from 'react'

// Font options (all FOSS fonts)
const fonts = ['font-mono', 'font-serif', 'font-sans', 'font-condensed', 'font-terminal', 'font-display']

// Theme options (100 color combinations)
const themes = Array.from({length: 100}, (_, i) => `theme-${i}`)

export const useTheme = () => {
  const [theme, setTheme] = useState(0)
  const [currentFont, setCurrentFont] = useState('font-mono')

  // Load saved theme and font from localStorage
  useEffect(() => {
    const savedTheme = parseInt(localStorage.getItem('currentTheme')) || 0
    const savedFont = parseInt(localStorage.getItem('currentFont')) || 0
    
    setTheme(savedTheme)
    setCurrentFont(fonts[savedFont])

    // Apply theme and font to body
    document.body.className = `${themes[savedTheme]} ${fonts[savedFont]}`
  }, [])

  const toggleTheme = () => {
    const newTheme = (theme + 1) % themes.length
    const newFontIndex = (newTheme) % fonts.length
    
    setTheme(newTheme)
    setCurrentFont(fonts[newFontIndex])

    // Apply theme and font to body
    document.body.className = `${themes[newTheme]} ${fonts[newFontIndex]}`
    
    // Save preferences
    localStorage.setItem('currentTheme', newTheme.toString())
    localStorage.setItem('currentFont', newFontIndex.toString())
  }

  return {
    theme,
    currentFont,
    toggleTheme
  }
}
