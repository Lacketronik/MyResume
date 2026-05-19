import './styles/App.css'
import MainPage from './pages/MainPage.tsx'
import ProjectPage from './pages/ProjectPage.tsx'
import NavigationBar from './components/NavigationBar.tsx'
import { Routes, Route } from 'react-router-dom'
import type { InformationProps } from './types/InformationProps';
import InformationService from './services/InformationService';
import { useEffect, useState } from 'react'

function App() {

  const [information, setInformation] = useState<InformationProps>({
    name: "",
    linkedin: "",
    introduction: [],
    role: [],
    resumeFileID: ""
  });

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const info = await InformationService.getInformation();
        setInformation(info);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchInformation();
  }, []);

  return (
    <>
      {information && <NavigationBar information={information} />}
      <Routes>
        <Route path="/" element={<MainPage information={information as InformationProps} />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </>
  )
}

export default App