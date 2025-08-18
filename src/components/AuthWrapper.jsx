import { useState, useEffect } from 'react'
import LoginPage from './LoginPage'
import App from '../App'

const AuthWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const cookies = document.cookie.split(';')
    const hasUsername = cookies.some(cookie => cookie.trim().startsWith('username='))
    const hasPassword = cookies.some(cookie => cookie.trim().startsWith('password='))
    
    if (hasUsername && hasPassword) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return isAuthenticated ? <App /> : <LoginPage onLogin={handleLogin} />
}

export default AuthWrapper