const ThemeToggle = ({ currentTheme, onToggle }) => {
  return (
    <button className="theme-toggle" aria-label="Toggle theme" onClick={onToggle}>
      <span id="theme-number">{currentTheme}</span>
    </button>
  )
}

export default ThemeToggle