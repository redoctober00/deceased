import React, { useState, useEffect } from 'react';
import './index.css';

const LINES = [
  "Dear diary,",
  "this is it.",
  "I have ended my miserable life",
  "i let it slip through my fingers",
  "out of my grip",
  "writing this has helped me put things into perspective I think,",
  "but in the end it hasn't really changed anything for me,",
  "i'm sorry, there were no choices left",
  "I made up my mind,",
  "not everyone can be saved.",
  "to whoever is reading this",
  "i hope my dead body will haunt you forever",
  "have fun scraping my brains off the wall."
];


const getScrollThreshold = () => {
  const isMobile = window.innerWidth <= 768;
  return isMobile ? 0.3 : 0.5; 
};

export default function Deceased() {
  const [currentLine, setCurrentLine] = useState(0);
  const [scrollThreshold, setScrollThreshold] = useState(getScrollThreshold);

  useEffect(() => {
    const handleResize = () => {
      setScrollThreshold(getScrollThreshold());
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const visibleLines = Math.floor(scrollPosition / (windowHeight * scrollThreshold)) + 1;
      const newCurrentLine = Math.min(visibleLines, LINES.length);
      
    
      const totalScrollHeight = LINES.length * windowHeight * scrollThreshold;
      const scrollPercent = Math.min(scrollPosition / totalScrollHeight, 1);
      
     
      const isMobile = window.innerWidth <= 768;
      const xRange = isMobile ? 50 : 40; 
      const yRange = isMobile ? 70 : 60;
      
      const bloodX = (50 - xRange/2) + (scrollPercent * xRange);
      const bloodY = (50 - yRange/2) + (scrollPercent * yRange);
   
      document.documentElement.style.setProperty('--blood-x', `${bloodX}%`);
      document.documentElement.style.setProperty('--blood-y', `${bloodY}%`);
      
      setCurrentLine(newCurrentLine);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollThreshold]);

  const renderLine = (line, index) => (
    <p
      key={index}
      className="deceased-line"
      style={{
        animation: `fadeIn 0.8s ease-in-out ${index * 0.2}s both`,
      }}
    >
      {line}
    </p>
  );

  return (
    <>
    
      <div className="deceased-background" />
      <div className="deceased-overlay" />
      
   
      <div className="deceased-container">
        <div className="deceased-content">
          {currentLine > 0 && renderLine(LINES[currentLine - 1], currentLine - 1)}
        </div>
      </div>

      <div 
        className="deceased-scroll-spacer" 
        style={{ height: `${LINES.length * 100}vh` }}
      >
        <div />
      </div>
    </>
  );
}