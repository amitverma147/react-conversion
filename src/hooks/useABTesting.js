import { useState, useCallback, useEffect } from 'react'

export const useABTesting = () => {
  const [buttonTextVariant, setButtonTextVariant] = useState('equals')
  const [buttonColorVariant, setButtonColorVariant] = useState('inverted')
  const [questionsVariant, setQuestionsVariant] = useState('original')
  const [bordersVisible, setBordersVisible] = useState(false)
  const [animationVariant, setAnimationVariant] = useState('current')
  const [ulUploadVariant, setUlUploadVariant] = useState('v1')

  const resetAll = useCallback(() => {
    setButtonTextVariant('equals')
    setButtonColorVariant('inverted')
    setQuestionsVariant('original')
    setBordersVisible(false)
    setAnimationVariant('current')
    setUlUploadVariant('v1')
    
    // Apply defaults immediately
    applyTextEquals()
    applyColorInverted()
    applyBordersTransparent()
    applyAnimationCurrent()
    
    showNotification('All tests reset to defaults')
  }, [])

  const applyChanges = useCallback(() => {
    showNotification('Changes applied successfully!')
  }, [])

  // Text Variant Implementations
  const applyTextEquals = () => {
    const checkoutBtns = document.querySelectorAll('.checkout-btn')
    checkoutBtns.forEach(btn => {
      btn.textContent = '=== checkout ==='
    })
  }

  const applyTextArrows = () => {
    const checkoutBtns = document.querySelectorAll('.checkout-btn')
    checkoutBtns.forEach(btn => {
      btn.textContent = '>>> CHECKOUT >>>'
    })
  }

  // Color Variant Implementations
  const applyColorInverted = () => {
    const checkoutBtns = document.querySelectorAll('.checkout-btn')
    checkoutBtns.forEach(btn => {
      btn.style.background = 'var(--text)'
      btn.style.color = 'var(--bg)'
      btn.style.border = '2px solid var(--text)'
    })
  }

  const applyColorOutlined = () => {
    const checkoutBtns = document.querySelectorAll('.checkout-btn')
    checkoutBtns.forEach(btn => {
      btn.style.background = 'transparent'
      btn.style.color = 'var(--text)'
      btn.style.border = '2px solid var(--text)'
    })
  }

  // Animation Implementations
  const clearAnimationClasses = () => {
    const checkoutBtns = document.querySelectorAll('.checkout-btn')
    checkoutBtns.forEach(btn => {
      const animClasses = Array.from(btn.classList).filter(c => c.startsWith('ab-anim-'))
      animClasses.forEach(c => btn.classList.remove(c))
    })
  }

  const applyAnimation = (variant) => {
    clearAnimationClasses()
    const checkoutBtns = document.querySelectorAll('.checkout-btn')
    checkoutBtns.forEach(btn => {
      btn.classList.add(`ab-anim-${variant}`)
    })
  }

  const applyAnimationCurrent = () => applyAnimation('lift')

  // Borders Implementation
  const applyBordersTransparent = () => {
    const mainContainer = document.querySelector('.main-content-container')
    if (mainContainer) {
      mainContainer.style.border = 'none'
      mainContainer.style.outline = 'none'
      mainContainer.style.padding = '0'
    }
    
    const shoppingCart = document.querySelector('.shopping-cart')
    if (shoppingCart) {
      shoppingCart.style.border = 'none'
      shoppingCart.style.outline = 'none'
    }
    
    const allQuestions = document.querySelectorAll('.questions-container')
    allQuestions.forEach(container => {
      container.style.border = 'none'
      container.style.outline = 'none'
    })
  }

  const applyBordersVisible = () => {
    const mainContainer = document.querySelector('.main-content-container')
    if (mainContainer) {
      mainContainer.style.border = '3px solid var(--text)'
      mainContainer.style.outline = '2px dashed var(--highlight)'
      mainContainer.style.outlineOffset = '4px'
      mainContainer.style.padding = '20px'
      mainContainer.style.borderRadius = '4px'
    }
    
    const shoppingCart = document.querySelector('.shopping-cart')
    if (shoppingCart) {
      shoppingCart.style.border = '2px solid var(--highlight)'
      shoppingCart.style.outline = '1px dotted var(--text)'
      shoppingCart.style.outlineOffset = '3px'
    }
    
    const allQuestions = document.querySelectorAll('.questions-container')
    allQuestions.forEach(container => {
      container.style.border = '2px solid var(--dim)'
      container.style.outline = '1px dashed var(--border)'
      container.style.outlineOffset = '2px'
    })
  }

  const showNotification = (message) => {
    const panel = document.querySelector('.ab-testing-panel')
    if (!panel) return
    
    const notification = document.createElement('div')
    notification.className = 'ab-notification'
    notification.textContent = message
    panel.appendChild(notification)
    
    setTimeout(() => {
      notification.classList.add('ab-notification-show')
    }, 10)
    
    setTimeout(() => {
      notification.classList.remove('ab-notification-show')
      setTimeout(() => notification.remove(), 300)
    }, 2000)
  }

  // Auto-apply changes when variants change
  useEffect(() => {
    if (buttonTextVariant === 'equals') applyTextEquals()
    else applyTextArrows()
  }, [buttonTextVariant])

  useEffect(() => {
    if (buttonColorVariant === 'inverted') applyColorInverted()
    else applyColorOutlined()
  }, [buttonColorVariant])

  useEffect(() => {
    applyAnimation(animationVariant)
  }, [animationVariant])

  useEffect(() => {
    if (bordersVisible) applyBordersVisible()
    else applyBordersTransparent()
  }, [bordersVisible])

  return {
    buttonTextVariant,
    setButtonTextVariant,
    buttonColorVariant,
    setButtonColorVariant,
    questionsVariant,
    setQuestionsVariant,
    bordersVisible,
    setBordersVisible,
    animationVariant,
    setAnimationVariant,
    ulUploadVariant,
    setUlUploadVariant,
    resetAll,
    applyChanges
  }
}