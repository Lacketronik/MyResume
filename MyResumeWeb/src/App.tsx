import './styles/App.css'
import MainPage from './pages/MainPage.tsx'
import { Routes, Route } from 'react-router-dom'
import type { PortfolioProps } from './types/PortfolioProps';
import PortfolioService from './services/PortfolioService';
import { useEffect, useState } from 'react'

const createEmptyPortfolio = (): PortfolioProps => ({
  information: {
    name: "",
    linkedin: "",
    introduction: [],
    role: [],
  },
  experiences: [],
  educations: [],
  certifications: [],
  projects: [],
  files: [],
  imageDetails: [],
});

function App() {

  const [portfolio, setPortfolio] = useState<PortfolioProps>(createEmptyPortfolio());

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolioData = await PortfolioService.getPortfolio();
        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage portfolio={portfolio} />} />
      </Routes>
    </>
  )
}

export default App