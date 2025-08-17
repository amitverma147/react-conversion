import React, { createContext, useContext, useState, useCallback } from 'react';
const ABTestingContext = createContext();
export const ABTestingProvider = ({children}) => {
	const [buttonTextVariant, setButtonTextVariant] = useState('equals');
	const [buttonColorVariant, setButtonColorVariant] = useState('inverted');
	const [questionsVariant, setQuestionsVariant] = useState('original');
	const [bordersVisible, setBordersVisible] = useState(false);
	const [animationVariant, setAnimationVariant] = useState('lift');
	const resetAll = useCallback(()=>{
		setButtonTextVariant('equals');
		setButtonColorVariant('inverted');
		setQuestionsVariant('original');
		setBordersVisible(false);
		setAnimationVariant('lift');
	},[]);
	return <ABTestingContext.Provider value={{ buttonTextVariant, setButtonTextVariant, buttonColorVariant, setButtonColorVariant, questionsVariant, setQuestionsVariant, bordersVisible, setBordersVisible, animationVariant, setAnimationVariant, resetAll }}>{children}</ABTestingContext.Provider>;
};
export const useAB = () => useContext(ABTestingContext);
