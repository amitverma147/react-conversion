import { useState, useEffect } from 'react'
import { useABTesting } from '../../hooks/useABTesting'
import './ABTestingPanel.css'

const ABTestingPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
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
  } = useABTesting()

  // Alt+Q keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'q' || e.key === 'Q' || e.code === 'KeyQ')) {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button 
        className="ab-trigger-btn"
        onClick={() => setIsOpen(true)}
        title="A/B Testing Panel (Alt+Q)"
      >
        A/B
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="ul-backdrop ul-panel-visible"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className="ab-testing-panel ab-panel-visible">
        <div className="ab-panel-header">
          <h3>A/B Testing Control Panel</h3>
          <button 
            className="ab-panel-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close panel"
          >
            &times;
          </button>
        </div>

          <div className="ab-panel-content">
            <div className="ab-tests-list">
              <div className="ab-test-item" data-test-id="button-text">
                <div className="ab-test-header">
                  <h4>Button Text</h4>
                  <p className="ab-test-description">Text format variants</p>
                </div>
                <div className="ab-test-variants">
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-button-text" 
                      value="equals" 
                      checked={buttonTextVariant === 'equals'}
                      onChange={() => setButtonTextVariant('equals')}
                    />
                    <span>===</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-button-text" 
                      value="arrows" 
                      checked={buttonTextVariant === 'arrows'}
                      onChange={() => setButtonTextVariant('arrows')}
                    />
                    <span>{`>>>`}</span>
                  </label>
                </div>
              </div>

              <div className="ab-test-item" data-test-id="button-colors">
                <div className="ab-test-header">
                  <h4>Button Colors</h4>
                  <p className="ab-test-description">Color scheme variants</p>
                </div>
                <div className="ab-test-variants">
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-button-colors" 
                      value="inverted" 
                      checked={buttonColorVariant === 'inverted'}
                      onChange={() => setButtonColorVariant('inverted')}
                    />
                    <span>Inverted</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-button-colors" 
                      value="outlined" 
                      checked={buttonColorVariant === 'outlined'}
                      onChange={() => setButtonColorVariant('outlined')}
                    />
                    <span>Outlined</span>
                  </label>
                </div>
              </div>

              <div className="ab-test-item" data-test-id="ul-upload-style">
                <div className="ab-test-header">
                  <h4>U/L Upload</h4>
                  <p className="ab-test-description">Upload control variants</p>
                </div>
                <div className="ab-test-variants">
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-ul-upload-style" 
                      value="v1" 
                      checked={ulUploadVariant === 'v1'}
                      onChange={() => setUlUploadVariant('v1')}
                    />
                    <span>Original</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-ul-upload-style" 
                      value="v2" 
                      checked={ulUploadVariant === 'v2'}
                      onChange={() => setUlUploadVariant('v2')}
                    />
                    <span>Icon-Centered</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-ul-upload-style" 
                      value="v3" 
                      checked={ulUploadVariant === 'v3'}
                      onChange={() => setUlUploadVariant('v3')}
                    />
                    <span>State-Based</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-ul-upload-style" 
                      value="v4" 
                      checked={ulUploadVariant === 'v4'}
                      onChange={() => setUlUploadVariant('v4')}
                    />
                    <span>Button Style</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-ul-upload-style" 
                      value="v5" 
                      checked={ulUploadVariant === 'v5'}
                      onChange={() => setUlUploadVariant('v5')}
                    />
                    <span>Animated</span>
                  </label>
                </div>
              </div>

              <div className="ab-test-item" data-test-id="interview-display">
                <div className="ab-test-header">
                  <h4>Interview Q's</h4>
                  <p className="ab-test-description">Question display format</p>
                </div>
                <div className="ab-test-variants">
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-interview-display" 
                      value="original" 
                      checked={questionsVariant === 'original'}
                      onChange={() => setQuestionsVariant('original')}
                    />
                    <span>Multi-Column</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-interview-display" 
                      value="single" 
                      checked={questionsVariant === 'single'}
                      onChange={() => setQuestionsVariant('single')}
                    />
                    <span>Single Column</span>
                  </label>
                </div>
              </div>

              <div className="ab-test-item" data-test-id="show-borders-main">
                <div className="ab-test-header">
                  <h4>Show Borders Main</h4>
                  <p className="ab-test-description">Toggle borders for main containers</p>
                </div>
                <div className="ab-test-variants">
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-show-borders-main" 
                      value="transparent" 
                      checked={!bordersVisible}
                      onChange={() => setBordersVisible(false)}
                    />
                    <span>Transparent</span>
                  </label>
                  <label className="ab-variant-option">
                    <input 
                      type="radio" 
                      name="ab-test-show-borders-main" 
                      value="visible" 
                      checked={bordersVisible}
                      onChange={() => setBordersVisible(true)}
                    />
                    <span>Visible</span>
                  </label>
                </div>
              </div>

              <div className="ab-test-item" data-test-id="button-animations">
                <div className="ab-test-header">
                  <h4>Animations</h4>
                  <p className="ab-test-description">Hover animation variants</p>
                </div>
                <div className="ab-test-variants">
                  {['current', 'slide', 'glow', 'pulse', 'shake', 'sweep', 'border', 'rotate', 'neon', 'explode', 'morph', 'peekaboo', 'fill', 'lightning', 'flip', 'zoom', 'magnetic', 'shimmer', 'bounce', 'conic'].map(anim => (
                    <label key={anim} className="ab-variant-option">
                      <input 
                        type="radio" 
                        name="ab-test-button-animations" 
                        value={anim} 
                        checked={animationVariant === anim}
                        onChange={() => setAnimationVariant(anim)}
                      />
                      <span>{anim.charAt(0).toUpperCase() + anim.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ab-panel-footer">
            <button className="ab-apply-btn" onClick={applyChanges}>
              Apply Changes
            </button>
            <button className="ab-reset-btn" onClick={resetAll}>
              Reset All
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ABTestingPanel