const HighlightTerm = ({ text, tooltip }) => {
  return (
    <span className="highlight-term" data-tooltip={tooltip}>
      {text}
    </span>
  )
}

export default HighlightTerm