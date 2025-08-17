import { useState, useCallback, useRef } from 'react'
import { interviewQuestions, mapDisplayToTopic } from '../data/interviewQuestions'

export const useHoverSystem = () => {
  const [showQuestions, setShowQuestions] = useState(false)
  const [currentTopic, setCurrentTopic] = useState(null)
  const [questions, setQuestions] = useState([])
  const [showSoftwareArrow, setShowSoftwareArrow] = useState(false)
  const [showHardwareArrow, setShowHardwareArrow] = useState(false)
  const hideTimeoutRef = useRef(null)

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  const scheduleHideQuestions = useCallback(() => {
    clearHideTimeout()
    hideTimeoutRef.current = setTimeout(() => {
      setShowQuestions(false)
      setCurrentTopic(null)
      setQuestions([])
    }, 200)
  }, [clearHideTimeout])

  const handleItemMouseEnter = useCallback((displayText) => {
    clearHideTimeout()
    const topic = mapDisplayToTopic(displayText)
    
    if (interviewQuestions[topic]) {
      setCurrentTopic(topic)
      setQuestions(interviewQuestions[topic])
      setShowQuestions(true)
    }
  }, [clearHideTimeout])

  const handleItemMouseLeave = useCallback(() => {
    scheduleHideQuestions()
  }, [scheduleHideQuestions])

  const handleQuestionsMouseEnter = useCallback(() => {
    clearHideTimeout()
  }, [clearHideTimeout])

  const handleQuestionsMouseLeave = useCallback(() => {
    scheduleHideQuestions()
  }, [scheduleHideQuestions])

  const handleSoftwareGridEnter = useCallback(() => {
    setShowSoftwareArrow(true)
  }, [])

  const handleSoftwareGridLeave = useCallback(() => {
    setShowSoftwareArrow(false)
  }, [])

  const handleHardwareGridEnter = useCallback(() => {
    setShowHardwareArrow(true)
  }, [])

  const handleHardwareGridLeave = useCallback(() => {
    setShowHardwareArrow(false)
  }, [])

  return {
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
  }
}