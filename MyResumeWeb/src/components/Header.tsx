import React from 'react';
import type { PortfolioProps } from '../types/PortfolioProps';
import '../styles/Header.css';

interface HeaderProps {
  portfolio: PortfolioProps;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ portfolio, activeTab, setActiveTab }) => {
  const tabs = ["projects", "experience", "education", "certification"];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-branding">
          <h1>{portfolio.information.name}</h1>
          <span className="header-role">{portfolio.information.role.join(" | ")}</span>
        </div>
        <nav className="header-tabs">
          {tabs.map((tab) => (
            <button 
              key={tab} 
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;