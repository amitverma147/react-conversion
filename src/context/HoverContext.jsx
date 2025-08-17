import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { interviewQuestions } from '../data/interviewQuestions';
const labelToTopic = (label) => label; // simplified mapping; extend if needed
const HoverContext = createContext();
export const HoverProvider = ({children}) => {
	const [currentTopic, setCurrentTopic] = useState(null);
	const hideTimer = useRef(null);
	const showTopic = useCallback(label => {
		if(hideTimer.current){ clearTimeout(hideTimer.current); hideTimer.current=null; }
		const topic = labelToTopic(label);
		if(interviewQuestions[topic]) setCurrentTopic(topic);
	}, []);
	const scheduleHide = useCallback(()=>{
		if(hideTimer.current) clearTimeout(hideTimer.current);
		hideTimer.current = setTimeout(()=>setCurrentTopic(null), 200);
	}, []);
	return <HoverContext.Provider value={{ currentTopic, showTopic, scheduleHide }}>{children}</HoverContext.Provider>;
};
export const useHover = () => useContext(HoverContext);
