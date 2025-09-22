// components/Menu/Menu.tsx
import React, { useState } from 'react';
import { IPage } from '../../models/interfaces';

interface MenuProps {
  pages: IPage[];
  onClose: () => void;
}

export const Menu: React.FC<MenuProps> = ({ pages, onClose }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const nextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      onClose();
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const currentPage = pages[currentPageIndex];

  return (
    <div className="menu">
      <div className="menu-header">
        <h1>Cardápio Especial</h1>
      </div>
      <div className="menu-content">
        <div className="page active">
          {currentPage.image && (
            <img src={currentPage.image} alt={currentPage.title} className="profile-img" />
          )}
          <h2>{currentPage.title}</h2>
          <div className="page-content" dangerouslySetInnerHTML={{ __html: currentPage.content }} />
        </div>
      </div>
      <div className="menu-footer">
        <button onClick={prevPage} disabled={currentPageIndex === 0}>
          Anterior
        </button>
        <div className="progress">
          {pages.map((_, index) => (
            <div key={index} className={`dot ${index === currentPageIndex ? 'active' : ''}`} />
          ))}
        </div>
        <button onClick={nextPage}>
          {currentPageIndex === pages.length - 1 ? 'Fechar Cardápio' : 'Próxima'}
        </button>
      </div>
    </div>
  );
};