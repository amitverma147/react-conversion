import { useABTesting } from '../hooks/useABTesting'

const QuestionsContainer = ({ show, questions, topic, onMouseEnter, onMouseLeave }) => {
  const { questionsVariant } = useABTesting()
  if (!show || !questions || questions.length === 0) {
    return (
      <div className="questions-container" id="questionsContainer">
        <div className="questions-content">
          <div className="questions-list" id="questionsList"></div>
        </div>
      </div>
    )
  }

  // Single column variant
  if (questionsVariant === 'single') {
    return (
      <div 
        className={`questions-container questions-single-column ${show ? 'active' : ''}`}
        id="questionsContainer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="questions-list-single">
          <div className="questions-single-column-content">
            <div className="question-text-block-large">
              {questions.join(' • ')}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Create 2 columns
  const questionsPerColumn = Math.ceil(questions.length / 2)
  const column1Questions = questions.slice(0, questionsPerColumn)
  const column2Questions = questions.slice(questionsPerColumn)

  return (
    <div 
      className={`questions-container ${show ? 'active' : ''}`} 
      id="questionsContainer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="questions-content">
        <div className="questions-list" id="questionsList">
          <div className="questions-column">
            {column1Questions.map((question, index) => (
              <div key={index} className="question-item visible">
                <span className="question-text">{question}</span>
              </div>
            ))}
          </div>
          <div className="questions-column">
            {column2Questions.map((question, index) => (
              <div key={index} className="question-item visible">
                <span className="question-text">{question}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionsContainer