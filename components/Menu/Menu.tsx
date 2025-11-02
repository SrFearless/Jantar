'use client';

import { useState, useEffect } from 'react';
import { IPage } from '../types';

interface MenuProps {
  pages: IPage[];
  onClose: () => void;
}

export function Menu({ pages, onClose }: MenuProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reiniciar animação ao mudar de página
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [currentPageIndex]);

  const handlePrevious = () => {
    if (currentPageIndex > 0 && !isAnimating) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < pages.length - 1 && !isAnimating) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (!isAnimating) {
      onClose();
    }
  };

  const currentPage = pages[currentPageIndex];

  return (
    <div className="menu">
      <div className="menuHeader">
        <h1>Cardápio Especial</h1>
      </div>
      
      <div className="menuContent" style={{ maxHeight: 'calc(100% - 120px)' }}>
  <div className={`page ${!isAnimating ? 'active' : ''}`}>
    {currentPage.image && (
      <img 
        src={currentPage.image} 
        alt={currentPage.title} 
        className="profileImg" 
        style={{ maxWidth: '80px', maxHeight: '80px' }} // Reduzindo imagem no mobile
      />
    )}
    <h2 style={{ fontSize: 'clamp(0.9rem, 4vw, 1.1rem)' }}>{currentPage.title}</h2>
    <div 
      className="pageContent" 
      dangerouslySetInnerHTML={{ __html: currentPage.content }} 
    />
  </div>
</div>
      
      <div className="menuFooter">
        <button onClick={handlePrevious} disabled={currentPageIndex === 0 || isAnimating}>
          Anterior
        </button>
        
        <div className="progress">
          {pages.map((_, index) => (
            <div 
              key={index} 
              className={`dot ${index === currentPageIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        
        <button onClick={handleNext} disabled={isAnimating}>
          {currentPageIndex === pages.length - 1 ? 'Fechar Cardápio' : 'Próxima'}
        </button>
      </div>
    </div>
  );
}