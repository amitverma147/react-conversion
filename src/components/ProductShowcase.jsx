import React, { useEffect, useMemo } from 'react';
import ThemeToggle from './ThemeToggle';
import SideText from './SideText';
import SoftwareSection from './SoftwareSection';
import HardwareSection from './HardwareSection';
import MiddleSection from './MiddleSection';
import TestingButtons from './TestingButtons';
// Lazy imports for new dynamic panels (files added separately)
import QuestionsOverlay from './QuestionsOverlay';
import ABTestingPanel from './ABTestingPanel';
import SkillsPanel from './SkillsPanel';
import { useHover } from '../context/HoverContext';
import { useAB } from '../context/ABTestingContext';

const ProductShowcase = () => {
  const { showTopic, scheduleHide } = useHover?.() || {};
  const { bordersVisible, buttonTextVariant, buttonColorVariant, animationVariant } = useAB?.() || {};
  useEffect(()=>{
    if(showTopic && scheduleHide){
      window.__showTopic = showTopic; window.__scheduleHide = scheduleHide; return ()=>{ delete window.__showTopic; delete window.__scheduleHide; };
    }
  }, [showTopic, scheduleHide]);
  useEffect(()=>{ const root = document.querySelector('.main-content-container'); if(root && bordersVisible!==undefined){ if(bordersVisible) root.classList.add('show-borders'); else root.classList.remove('show-borders'); } }, [bordersVisible]);
  const checkoutText = useMemo(()=>buttonTextVariant==='arrows'? '>>> CHECKOUT >>>':'=== checkout ===',[buttonTextVariant]);
  const checkoutStyle = useMemo(()=>buttonColorVariant==='outlined'? { background:'transparent', color:'var(--text)', border:'2px solid var(--text)' } : { background:'var(--text)', color:'var(--bg)', border:'2px solid var(--text)' }, [buttonColorVariant]);
  const animClass = useMemo(()=>animationVariant? `ab-anim-${animationVariant}`:'',[animationVariant]);
  useEffect(()=>{ document.querySelectorAll('.checkout-btn').forEach(btn=>{ btn.textContent = checkoutText; Object.assign(btn.style, checkoutStyle); [...btn.classList].filter(c=>c.startsWith('ab-anim-')).forEach(c=>btn.classList.remove(c)); if(animClass) btn.classList.add(animClass); }); }, [checkoutText, checkoutStyle, animClass]);
  return (
    <>
      <SideText />
      <main className="main-content">
        <ThemeToggle />
        <SoftwareSection />
        <MiddleSection />
        <HardwareSection />
        <QuestionsOverlay />
        <TestingButtons />
        <ABTestingPanel />
        <SkillsPanel />
      </main>
    </>
  );
};

export default ProductShowcase;
