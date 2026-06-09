import React from 'react';
import type { PortfolioProps } from '../types/PortfolioProps';
import '../styles/Footer.css';

interface FooterProps {
  portfolio: PortfolioProps;
}

const Footer: React.FC<FooterProps> = ({ portfolio }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{new Date().getFullYear()} {portfolio.information?.name}</p>
        <p>Built with React & TypeScript</p>
      </div>
    </footer>
  );
};

export default Footer;