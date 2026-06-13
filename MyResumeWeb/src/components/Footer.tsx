import React from 'react';
import type { PortfolioProps } from '../types/PortfolioProps';
import '../styles/Footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  portfolio: PortfolioProps;
}

const Footer: React.FC<FooterProps> = ({ portfolio }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="mb-2">
            © {new Date().getFullYear()} {portfolio.information?.name}
        </p>
        
        <div className="d-flex justify-content-center gap-4 mb-3">
            <a href={portfolio.information?.github} target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaGithub />
            </a>
            <a href={portfolio.information?.linkedin} target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <FaLinkedin />
            </a>
        </div>
        
        <button 
            className="btn btn-link btn-sm text-secondary text-decoration-none" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            Back to top ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;