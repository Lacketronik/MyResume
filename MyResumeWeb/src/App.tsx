import './styles/App.css'
import MainPage from './pages/MainPage.tsx'
import { Routes, Route } from 'react-router-dom'
import type { PortfolioProps } from './types/PortfolioProps';
import PortfolioService from './services/PortfolioService';
import { useEffect, useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';

const createEmptyPortfolio = (): PortfolioProps => ({
  information: {
    name: "",
    linkedin: "",
    github: "",
    email: [],
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
  const [activeTab, setActiveTab] = useState("projects");
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

  if (!portfolio) return <div>Loading...</div>;
  
  return (
    <div className="app-container">
      <Header portfolio={portfolio} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="content-wrapper">
        <Routes>
          <Route path="/" element={<MainPage portfolio={portfolio} activeTab={activeTab} />} />
        </Routes>
      </main>
      <Footer portfolio={portfolio} />
    </div>
  )
}

export default App