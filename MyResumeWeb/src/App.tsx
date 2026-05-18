import './styles/App.css'
import MainPage from './pages/MainPage.tsx'
import ProjectPage from './pages/ProjectPage.tsx'
import NavigationBar from './components/NavigationBar.tsx'
import { Routes, Route } from 'react-router-dom'
import type { InformationProps } from './types/InformationProps';

function App() {

  //sample information data for testing
  const information: InformationProps = {
    name: "Faliq",
    linkedin: "https://www.linkedin.com/in/m-faliq-b-alhakim/",
    introduction: [
      "Hello! I'm Faliq, and I build for the web. I get genuinely excited about clean architecture and code, and everything that happens from the first line of code to the final deployment.",
      "I'm also really leaning into cloud computing. I enjoy configuring and managing cloud infrastructure to build scalable and reliable solutions."
    ],
    role: [
      "Full-Stack Developer",
      "DevOps Enthusiast"
    ],
    resumeFileID: "1a2b3c4d5e6f7g8h9i0j"
  };

  return (
    <>
      <NavigationBar information={information} />
      <Routes>
        <Route path="/" element={<MainPage information={information} />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </>
  )
}

export default App