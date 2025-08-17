import React, { useState } from 'react';
import './ULPanel.css';

const ULPanel = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            {/* Always visible trigger button */}
            <button 
                className="ul-trigger-btn"
                onClick={() => setIsVisible(true)}
            >
                U/L
            </button>

            {/* Content will be added here */}
        </>
    );
};

export default ULPanel;
