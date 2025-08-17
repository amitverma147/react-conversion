// Placeholder to avoid import errors until full file added
import React, { useMemo } from 'react';
import { useHover } from '../context/HoverContext';
import { useAB } from '../context/ABTestingContext';
import { interviewQuestions } from '../data/interviewQuestions';
export default function QuestionsOverlay(){
	const { currentTopic } = useHover() || {};
	const { questionsVariant } = useAB() || {};
	const markup = useMemo(()=>{
		if(!currentTopic) return null;
		const qs = interviewQuestions[currentTopic] || [];
		if(questionsVariant==='single'){
			return (
				<div className="questions-container questions-single-column active">
					<div className="questions-list-single">
						<div className="questions-single-column-content">
							<div className="question-text-block-large">{qs.join(' • ')}</div>
						</div>
					</div>
				</div>
			);
		}
		const mid=Math.ceil(qs.length/2);
		return (
			<div className="questions-container active" style={{pointerEvents:'none'}}>
				<div className="questions-content">
					<div className="questions-list">
						<div className="questions-column">{qs.slice(0,mid).map((q,i)=>(<div key={i} className="question-item visible"><span className="question-text">{q}</span></div>))}</div>
						<div className="questions-column">{qs.slice(mid).map((q,i)=>(<div key={i} className="question-item visible"><span className="question-text">{q}</span></div>))}</div>
					</div>
				</div>
			</div>
		);
	}, [currentTopic, questionsVariant]);
	return markup;
}
