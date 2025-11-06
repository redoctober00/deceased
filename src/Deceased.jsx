import React, { useState, useEffect } from 'react';

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

export default function Deceased() {
  const [currentLine, setCurrentLine] = useState(0);


  const goToNextLine = () => {
    if (currentLine < LINES.length - 1) {
      setCurrentLine(prev => prev + 1);
    }
  };


  const goToPrevLine = () => {
    if (currentLine > 0) {
      setCurrentLine(prev => prev - 1);
    }
  };

 
  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const containerHeight = rect.height;
    const clickPosition = clickY / containerHeight;

    if (clickPosition < 0.5) {
     
      goToPrevLine();
    } else {
 
      goToNextLine();
    }
  };


  useEffect(() => {
    const updateBloodPosition = () => {
      const progress = LINES.length > 0 ? currentLine / (LINES.length - 1) : 0;
      const isMobile = window.innerWidth <= 768;
      const xRange = isMobile ? 50 : 40;
      const yRange = isMobile ? 70 : 60;
      
      const bloodSplatters = [
        { base: { x: 15, y: 20 }, range: { x: xRange, y: yRange * 1.5 }, speed: 1.0 },
        { base: { x: 75, y: 10 }, range: { x: xRange * 0.8, y: yRange * 1.2 }, speed: 0.7 },
        { base: { x: 25, y: 70 }, range: { x: xRange * 1.2, y: yRange * 0.9 }, speed: 1.3 },
        { base: { x: 85, y: 60 }, range: { x: xRange * 0.6, y: yRange * 1.1 }, speed: 0.9 },
        { base: { x: 45, y: 85 }, range: { x: xRange * 1.1, y: yRange * 0.7 }, speed: 1.1 }
      ];
      
      bloodSplatters.forEach((splatter, index) => {
        const adjustedPercent = Math.sin(progress * Math.PI * splatter.speed) * 0.5 + 0.5;
        const bloodX = splatter.base.x + (Math.sin(progress * Math.PI * 2 * splatter.speed) * splatter.range.x * 0.5);
        const bloodY = splatter.base.y + (adjustedPercent * splatter.range.y);
        
        document.documentElement.style.setProperty(`--blood-${index + 1}-x`, `${bloodX}%`);
        document.documentElement.style.setProperty(`--blood-${index + 1}-y`, `${bloodY}%`);
      });
    };

    updateBloodPosition();
  }, [currentLine]);

  return (
    <>
   
      <div className="deceased-background" />
      <div className="deceased-overlay" />
      
   
      <div 
        className="deceased-container"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
      
        <div className="click-zone-upper" />
        <div className="click-zone-lower" />
        
        <div className="deceased-content">
          {currentLine < LINES.length && (
            <p
              className="deceased-line"
              style={{
                animation: `fadeIn 0.8s ease-in-out both`,
                transition: 'transform 0.2s ease-out',
                pointerEvents: 'none',
              }}
            >
              {LINES[currentLine]}
            </p>
          )}
          
      
          <div className="navigation-hints">
            {currentLine > 0 && (
              <div className="hint-back">↑</div>
            )}
            {currentLine < LINES.length - 1 && (
              <div className="hint-forward">↓</div>
            )}
          </div>
          
      
          <div className="progress-indicator">
            {currentLine + 1} / {LINES.length}
          </div>
        </div>
      </div>
    </>
  );
}