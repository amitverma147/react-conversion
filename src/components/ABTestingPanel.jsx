import React, { useState, useEffect } from 'react';
import { useAB } from '../context/ABTestingContext';
import { useHover } from '../context/HoverContext';
export default function ABTestingPanel(){
	const [open,setOpen]=useState(false);
	const { buttonTextVariant, setButtonTextVariant, buttonColorVariant, setButtonColorVariant, questionsVariant, setQuestionsVariant, bordersVisible, setBordersVisible, animationVariant, setAnimationVariant, resetAll } = useAB() || {};
		useHover(); // ensure hook executes if later needed
	useEffect(()=>{ const h=e=>{ if(e.altKey && (e.key==='q'||e.key==='Q')){ e.preventDefault(); setOpen(o=>!o);} }; window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h); },[]);
	return (
		<>
			<button className="ab-trigger-btn" onClick={()=>setOpen(true)}>A/B</button>
			<div className={`ab-testing-panel ${open?'ab-panel-visible':''}`} role="dialog" aria-modal="true">
				<div className="ab-panel-header"><h3>A/B Testing</h3><button className="ab-panel-close" onClick={()=>setOpen(false)}>&times;</button></div>
				<div className="ab-panel-content">
					<section className="ab-test-item"><h4>Button Text</h4>
						<label><input type="radio" name="btnText" value="equals" checked={buttonTextVariant==='equals'} onChange={()=>setButtonTextVariant('equals')} /> ===</label>
						<label><input type="radio" name="btnText" value="arrows" checked={buttonTextVariant==='arrows'} onChange={()=>setButtonTextVariant('arrows')} /> {'>>>'}</label>
					</section>
					<section className="ab-test-item"><h4>Button Colors</h4>
						<label><input type="radio" name="btnColor" value="inverted" checked={buttonColorVariant==='inverted'} onChange={()=>setButtonColorVariant('inverted')} /> Inverted</label>
						<label><input type="radio" name="btnColor" value="outlined" checked={buttonColorVariant==='outlined'} onChange={()=>setButtonColorVariant('outlined')} /> Outlined</label>
					</section>
					<section className="ab-test-item"><h4>Questions Display</h4>
						<label><input type="radio" name="qVar" value="original" checked={questionsVariant==='original'} onChange={()=>setQuestionsVariant('original')} /> Multi-Column</label>
						<label><input type="radio" name="qVar" value="single" checked={questionsVariant==='single'} onChange={()=>setQuestionsVariant('single')} /> Single Column</label>
					</section>
					<section className="ab-test-item"><h4>Main Borders</h4>
						<label><input type="checkbox" checked={bordersVisible} onChange={()=>setBordersVisible(v=>!v)} /> Show Borders</label>
					</section>
					<section className="ab-test-item"><h4>Animation</h4>
						<select value={animationVariant} onChange={e=>setAnimationVariant(e.target.value)}>
							<option value="lift">Lift</option>
							<option value="slide">Slide</option>
							<option value="glow">Glow</option>
						</select>
					</section>
				</div>
				<div className="ab-panel-footer"><button className="ab-reset-btn" onClick={resetAll}>Reset</button><button className="ab-apply-btn" onClick={()=>setOpen(false)}>Close</button></div>
			</div>
		</>
	);
}
